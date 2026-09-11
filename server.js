import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and increase JSON payload limit for base64 images/audio
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static frontend files
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
  res.json({
    status: 'ok',
    apiKeyConfigured: hasKey,
    nodeVersion: process.version
  });
});

// Gemini Generation Endpoint
app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return res.status(500).json({
      error: {
        message: 'Gemini API key is not configured on the server. Please add GEMINI_API_KEY to your .env file.'
      }
    });
  }

  const { systemPrompt, userContent, model } = req.body;
  if (!userContent) {
    return res.status(400).json({
      error: { message: 'Missing userContent in request body' }
    });
  }

  // Model choice: allow client override, or env var, or modern 3.x default
  const candidateModels = [
    model,
    process.env.GEMINI_MODEL,
    'gemini-3.6-flash',
    'gemini-3.5-flash-lite'
  ].filter(Boolean);
  
  const selectedModel = candidateModels[0];
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
          contents: [{ role: 'user', parts: [{ text: userContent }] }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `Google API error (${response.status})`);
      }

      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanedHtml = rawText
        .replace(/^```html\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      return res.json({
        success: true,
        html: cleanedHtml
      });
    } catch (err) {
      console.warn(`[Gemini API] Attempt ${attempt}/${maxRetries} failed: ${err.message}`);
      if (attempt === maxRetries) {
        return res.status(502).json({
          error: { message: err.message || 'Failed to generate content from Gemini API' }
        });
      }
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 750;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  WishCraft Server running!`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured [OK]' : 'MISSING [!] (Check .env)'}`);
  console.log(`=========================================`);
});
