export default async (request, context) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Method Not Allowed' } }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  const apiKey = (typeof Netlify !== 'undefined' && Netlify.env?.get('GEMINI_API_KEY')) ||
                 (typeof Deno !== 'undefined' && Deno.env?.get('GEMINI_API_KEY'));

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
    body = await request.json();
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

  // Model choice: prioritize Gemini 3.7 Flash, with ultra-fast fallback to 3.5-flash-lite
  const customModel = (typeof Netlify !== 'undefined' && Netlify.env?.get('GEMINI_MODEL')) ||
                      (typeof Deno !== 'undefined' && Deno.env?.get('GEMINI_MODEL'));

  const candidateModels = [
    model,
    customModel,
    'gemini-3.7-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.6-flash'
  ].filter(Boolean);

  const uniqueModels = [...new Set(candidateModels)];
  const encoder = new TextEncoder();

  // Netlify Edge Functions natively support streaming via ReadableStream
  const bodyStream = new ReadableStream({
    async start(controller) {
      let successful = false;

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

          if (!res.ok) {
            console.warn(`[Gemini Edge] Model ${selectedModel} returned HTTP ${res.status}. Trying next fallback...`);
            continue;
          }

          console.log(`[Gemini Edge] Successfully streaming from: ${selectedModel}`);
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

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
                    successful = true;
                  }
                } catch (_) {}
              }
            }
          }

          if (successful) {
            break;
          }
        } catch (fetchErr) {
          console.warn(`[Gemini Edge] Model ${selectedModel} fetch error:`, fetchErr);
        }
      }

      if (!successful) {
        controller.enqueue(encoder.encode(`\n<!-- Error: All Gemini models were unavailable or busy. Please try again. -->`));
      }

      controller.close();
    }
  });

  return new Response(bodyStream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no'
    }
  });
};
