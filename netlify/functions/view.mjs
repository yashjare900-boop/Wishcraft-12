import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let viewCount = 0;

export default async (req, context) => {
  const url = new URL(req.url);
  const vParam = url.searchParams.get('v') || url.searchParams.get('og');

  viewCount++;
  let choice = (viewCount % 2 === 1) ? 1 : 2;

  if (vParam === '1') {
    choice = 1;
  } else if (vParam === '2') {
    choice = 2;
  } else {
    const timeBucket = Math.floor(Date.now() / 15000);
    choice = ((viewCount + timeBucket) % 2 === 0) ? 2 : 1;
  }

  const selectedImage = choice === 2
    ? 'https://wishcraft-12.netlify.app/og-preview-2.jpg'
    : 'https://wishcraft-12.netlify.app/og-preview-1.jpg';

  let htmlContent = '';
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const possiblePaths = [
    path.resolve(process.cwd(), 'view.html'),
    path.resolve(currentDir, '..', '..', 'view.html')
  ];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        htmlContent = fs.readFileSync(p, 'utf8');
        break;
      }
    } catch (_) {}
  }

  if (!htmlContent) {
    return new Response('WishCraft View Loading...', {
      status: 302,
      headers: { 'Location': `/view.html${url.search}` }
    });
  }

  // Inject chosen alternating image into primary Open Graph & Twitter meta tags
  const primaryMeta = `<meta property="og:image" content="${selectedImage}">
<meta property="og:image:secure_url" content="${selectedImage}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="675">
<meta name="twitter:image" content="${selectedImage}">`;

  htmlContent = htmlContent.replace(/<meta property="og:image"[^>]*>/i, primaryMeta);

  return new Response(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-WishCraft-View-Variant': String(choice)
    }
  });
};

export const config = {
  path: ['/view', '/view.html']
};
