export default async (req, context) => {
  const apiKey = process.env.GEMINI_API_KEY || (typeof Netlify !== 'undefined' && Netlify.env ? Netlify.env.get('GEMINI_API_KEY') : undefined);
  const envModel = (process.env.GEMINI_MODEL && process.env.GEMINI_MODEL !== 'gemini-3.6-flash') ? process.env.GEMINI_MODEL : null;
  return new Response(JSON.stringify({
    status: 'ok',
    version: 'v2.2-no-3.6-exhausted',
    activeDefaultModel: envModel || 'gemini-3.5-flash-lite',
    environment: 'netlify',
    apiKeyConfigured: Boolean(apiKey && apiKey.trim())
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

export const config = {
  path: '/api/health'
};
