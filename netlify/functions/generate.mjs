import { stream } from '@netlify/functions';

export default stream(async (req, context) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Method Not Allowed' } }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  const apiKey = process.env.GEMINI_API_KEY || (typeof Netlify !== 'undefined' && Netlify.env ? Netlify.env.get('GEMINI_API_KEY') : undefined);
  if (!apiKey || !apiKey.trim()) {
    return new Response(JSON.stringify({
      error: {
        message: 'GEMINI_API_KEY is not configured in Netlify environment variables. Please add it under Site configuration > Environment variables.'
      }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: { message: 'Invalid JSON request body' } }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  const { systemPrompt, userContent, model } = body;
  if (!userContent) {
    return new Response(JSON.stringify({ error: { message: 'Missing userContent in request body' } }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Model selection: ignore exhausted gemini-3.6-flash, prioritize gemini-3.5-flash-lite or gemini-3.7-flash
  const envModel = (process.env.GEMINI_MODEL && process.env.GEMINI_MODEL !== 'gemini-3.6-flash') ? process.env.GEMINI_MODEL : null;
  const candidateModels = [
    model,
    envModel,
    'gemini-3.5-flash-lite',
    'gemini-3.7-flash'
  ].filter(Boolean);

  const uniqueModels = [...new Set(candidateModels)];
  const encoder = new TextEncoder();
  let geminiRes = null;
  let lastErrMsg = 'Failed to connect to Gemini API';

  for (const selectedModel of uniqueModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:streamGenerateContent?key=${apiKey}&alt=sse`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
          contents: [{ role: 'user', parts: [{ text: userContent }] }]
        })
      });

      if (res.ok) {
        geminiRes = res;
        console.log(`[Gemini API] Successfully connected using model: ${selectedModel}`);
        break;
      }

      const errText = await res.text();
      console.warn(`[Gemini API] Model ${selectedModel} returned ${res.status}: ${errText.slice(0, 150)}`);
      try {
        const errObj = JSON.parse(errText);
        if (errObj.error?.message) lastErrMsg = errObj.error.message;
      } catch (_) {
        lastErrMsg = `Google API error (${res.status})`;
      }

      // Always try the next model in candidateModels if the current one fails (quota, busy, etc.)
      continue;
    } catch (fetchErr) {
      console.warn(`[Gemini API] Model ${selectedModel} fetch error: ${fetchErr.message}`);
      lastErrMsg = fetchErr.message;
    }
  }

  if (!geminiRes) {
    return new Response(JSON.stringify({ error: { message: lastErrMsg } }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Stream chunks back through Netlify (60s limit with continuous data)
  const readable = new ReadableStream({
    async start(controller) {
      const reader = geminiRes.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              const jsonStr = trimmed.slice(6);
              try {
                const parsed = JSON.parse(jsonStr);
                const chunkText = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
                if (chunkText) {
                  controller.enqueue(encoder.encode(chunkText));
                }
              } catch (e) {
                // ignore partial JSON chunk
              }
            }
          }
        }
      } catch (streamErr) {
        console.error('[Netlify Stream Error]', streamErr);
      } finally {
        controller.close();
      }
    }
  });

  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no'
    }
  });
});

export const config = {
  path: '/api/generate'
};
