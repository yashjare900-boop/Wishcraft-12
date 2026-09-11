export default (request, context) => {
  const apiKey = (typeof Netlify !== 'undefined' && Netlify.env?.get('GEMINI_API_KEY')) ||
                 (typeof Deno !== 'undefined' && Deno.env?.get('GEMINI_API_KEY'));

  return new Response(JSON.stringify({
    status: 'ok',
    environment: 'netlify-edge',
    preferredModel: 'gemini-3.7-flash',
    apiKeyConfigured: Boolean(apiKey && apiKey.trim())
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
