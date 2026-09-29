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

// Clean routes for About / Creator
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/creator', (req, res) => res.redirect(301, '/about'));

// Favicon handler
app.get('/favicon.ico', (req, res) => res.status(204).end());

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

  // Model choice: prioritize production Gemini models with automatic fallback
  const candidateModels = [
    model,
    process.env.GEMINI_MODEL,
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ].filter(Boolean);
  
  const uniqueModels = [...new Set(candidateModels)];
  let lastError = 'Failed to generate content';

  for (const selectedModel of uniqueModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
          contents: [{ role: 'user', parts: [{ text: userContent }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates?.[0]?.content?.parts) {
        const candidateParts = data.candidates[0].content.parts;
        const nonThoughtParts = candidateParts.filter(p => !p.thought && typeof p.text === 'string');
        const rawText = nonThoughtParts.length > 0 
          ? nonThoughtParts.map(p => p.text).join('') 
          : (candidateParts[candidateParts.length - 1]?.text || '');

        const cleaned = rawText
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/```\s*$/i, '')
          .trim();

        let parsedData = null;
        try {
          parsedData = JSON.parse(cleaned);
        } catch (_) {
          const firstBrace = cleaned.indexOf('{');
          const lastBrace = cleaned.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace > firstBrace) {
            try { parsedData = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1)); } catch (e) {}
          }
        }

        return res.json({
          success: true,
          model: selectedModel,
          data: parsedData,
          raw: cleaned
        });
      }

      lastError = data.error?.message || `Google API error (${response.status})`;
      console.warn(`[Gemini API] Model ${selectedModel} failed: ${lastError}. Trying next model...`);
    } catch (err) {
      lastError = err.message;
      console.warn(`[Gemini API] Error contacting ${selectedModel}: ${err.message}`);
    }
  }

  return res.status(502).json({
    error: { message: lastError }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  WishCraft Server running!`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured [OK]' : 'MISSING [!] (Check .env)'}`);
  console.log(`=========================================`);
});
