import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let counter = 0;

export default async (req, context) => {
  const url = new URL(req.url);
  const vParam = url.searchParams.get('v') || url.searchParams.get('og') || url.searchParams.get('img');

  counter++;
  let choice = (counter % 2 === 1) ? 1 : 2;

  if (vParam === '1') {
    choice = 1;
  } else if (vParam === '2') {
    choice = 2;
  } else {
    // If no explicit variant parameter, alternate based on in-memory count and 15-second time bucket
    const timeBucket = Math.floor(Date.now() / 15000);
    choice = ((counter + timeBucket) % 2 === 0) ? 2 : 1;
  }

  const filename = choice === 2 ? 'og-preview-2.jpg' : 'og-preview-1.jpg';

  let buffer = null;
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const possiblePaths = [
    path.resolve(process.cwd(), filename),
    path.resolve(process.cwd(), 'public', filename),
    path.resolve(currentDir, '..', '..', filename)
  ];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        buffer = fs.readFileSync(p);
        break;
      }
    } catch (_) {}
  }

  if (!buffer) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `/${filename}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'X-WishCraft-OG-Variant': String(choice)
    }
  });
};

export const config = {
  path: ['/api/og-image', '/og-preview.png']
};
