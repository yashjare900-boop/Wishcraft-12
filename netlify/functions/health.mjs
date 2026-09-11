export default async (req, context) => {
  const apiKey = process.env.GEMINI_API_KEY || (typeof Netlify !== 'undefined' && Netlify.env ? Netlify.env.get('GEMINI_API_KEY') : undefined);
  return new Response(JSON.stringify({
    status: 'ok',
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
