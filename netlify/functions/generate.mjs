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

  // Model choice: default to ultra-fast gemini-3.5-flash-lite to prevent timeouts
  const candidateModels = [
    model,
    process.env.GEMINI_MODEL,
    'gemini-3.5-flash-lite',
    'gemini-3.6-flash'
  ].filter(Boolean);

  const selectedModel = candidateModels[0];
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:streamGenerateContent?key=${apiKey}&alt=sse`;

  const encoder = new TextEncoder();

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
        contents: [{ role: 'user', parts: [{ text: userContent }] }]
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      let msg = `Google API error (${geminiRes.status})`;
      try {
        const errObj = JSON.parse(errText);
        if (errObj.error?.message) msg = errObj.error.message;
      } catch (_) {}
      return new Response(JSON.stringify({ error: { message: msg } }), {
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
  } catch (err) {
    return new Response(JSON.stringify({ error: { message: err.message || 'Server error' } }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
});

export const config = {
  path: '/api/generate'
};
