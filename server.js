const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const UPLOADS_DIR = path.join(__dirname, 'img', 'gallery', 'uploads');

// Helper to save base64 data to disk
function saveBase64Image(dataUrl, originalName = 'photo') {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    
    // Match data:image/png;base64,.... or raw base64
    const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
    let ext = 'png';
    let base64Data = dataUrl;

    if (match) {
      ext = match[1].toLowerCase();
      if (ext === 'svg+xml') ext = 'svg';
      if (ext === 'jpeg') ext = 'jpg';
      base64Data = match[2];
    } else {
      const extMatch = path.extname(originalName).replace('.', '').toLowerCase();
      if (extMatch) ext = extMatch;
    }

    const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);

    return `img/gallery/uploads/${filename}`;
  } catch (err) {
    console.error('Error saving base64 image:', err);
    return null;
  }
}

function handleRequest(req, res) {
  let reqUrl = req.url.split('?')[0];

  // Enable CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoint: GET /api/gallery
  if (req.method === 'GET' && reqUrl === '/api/gallery') {
    const dataPath = path.join(__dirname, 'data', 'gallery-data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      if (err) {
        res.end('[]');
      } else {
        res.end(data);
      }
    });
    return;
  }

  // API Endpoint: POST /api/upload (Direct Image Upload)
  if (req.method === 'POST' && reqUrl === '/api/upload') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        if (parsed.image) {
          const savedUrl = saveBase64Image(parsed.image, parsed.name || 'image');
          if (savedUrl) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, url: savedUrl }));
            return;
          }
        } else if (Array.isArray(parsed.images)) {
          const urls = parsed.images.map((img, i) => saveBase64Image(img, `image_${i}`));
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, urls }));
          return;
        }

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'No valid image data provided' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // API Endpoint: POST /api/gallery
  if (req.method === 'POST' && reqUrl === '/api/gallery') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        let parsed = JSON.parse(body);
        if (!Array.isArray(parsed)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Expected an array of gallery events' }));
          return;
        }

        // Automatically convert any embedded base64 images to real files on disk
        parsed = parsed.map(ev => {
          if (Array.isArray(ev.images)) {
            ev.images = ev.images.map((img, idx) => {
              if (typeof img === 'string' && img.startsWith('data:image/')) {
                const saved = saveBase64Image(img, `${ev.id || 'event'}_${idx}`);
                return saved || img;
              }
              return img;
            });
          }
          return ev;
        });

        const dataPath = path.join(__dirname, 'data', 'gallery-data.json');
        fs.mkdirSync(path.dirname(dataPath), { recursive: true });
        fs.writeFile(dataPath, JSON.stringify(parsed, null, 2), 'utf8', (writeErr) => {
          if (writeErr) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to save data' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, count: parsed.length, data: parsed }));
          }
        });
      } catch (parseErr) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // Route Aliases
  if (reqUrl === '/admin' || reqUrl === '/admin/') reqUrl = '/admin.html';
  if (reqUrl === '/gallery' || reqUrl === '/gallery/') reqUrl = '/gallery.html';

  let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : reqUrl);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      const notFoundPath = path.join(__dirname, '404.html');
      fs.readFile(notFoundPath, (err404, content404) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        if (!err404) {
          res.end(content404);
        } else {
          res.end('<h1>404 Not Found</h1><p><a href="/">Back to Home</a></p>');
        }
      });
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
}

function startServer(port) {
  const srv = http.createServer(handleRequest);

  srv.listen(port, () => {
    console.log(`\n==============================================`);
    console.log(`🚀 Portfolio is running live on localhost!`);
    console.log(`👉 http://localhost:${port}`);
    console.log(`==============================================\n`);
  });

  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
