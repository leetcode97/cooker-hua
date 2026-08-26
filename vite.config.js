import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const localKvStore = new Map();

function localSyncPlugin() {
  return {
    name: 'local-sync-plugin',
    configureServer(server) {
      server.middlewares.use('/api/sync', (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const code = url.searchParams.get('code');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (!code || code.length !== 6) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid 6-digit sync code' }));
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              localKvStore.set(code, data);
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, code }));
            } catch (e) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
          return;
        }

        if (req.method === 'GET') {
          const data = localKvStore.get(code) || null;
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, data }));
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), localSyncPlugin()],
});
