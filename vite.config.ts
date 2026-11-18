import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { IncomingMessage } from 'node:http';
import pg from 'pg';
import {
  createTip,
  deleteTip,
  getTipById,
  listTips,
  updateTip,
  type TipInput,
} from './api/lib/tips';

const rootDir = dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolveBody({});
        return;
      }
      try {
        resolveBody(JSON.parse(raw) as Record<string, unknown>);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function toTipInput(body: Record<string, unknown>): TipInput {
  return {
    tip: String(body.tip || '').trim(),
    tip_date: body.tip_date ? String(body.tip_date).slice(0, 10) : null,
    tip_category: body.tip_category ? String(body.tip_category) : null,
    hook: body.hook ? String(body.hook) : null,
    tip_description: body.tip_description
      ? String(body.tip_description)
      : null,
    instagram_url: body.instagram_url ? String(body.instagram_url) : null,
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '');
  const connectionString = env.DATABASE_URL || process.env.DATABASE_URL;
  const adminPassword = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '';

  let pool: pg.Pool | null = null;
  const getDevPool = () => {
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL is not set (add it to .env for local /api/tips)',
      );
    }
    if (!pool) {
      pool = new Pool({
        connectionString,
        ssl:
          env.DATABASE_SSL === 'false'
            ? undefined
            : { rejectUnauthorized: false },
        max: 3,
      });
    }
    return pool;
  };

  const isAdminAuthorized = (req: IncomingMessage) => {
    if (!adminPassword) return false;
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    return token === adminPassword;
  };

  return {
    plugins: [
      react(),
      {
        name: 'dev-api-tips',
        configureServer(server) {
          server.middlewares.use('/api/tips', async (req, res, next) => {
            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              res.end();
              return;
            }
            if (req.method !== 'GET') {
              next();
              return;
            }

            try {
              const url = new URL(req.url || '', 'http://localhost');
              const id = url.searchParams.get('id') || '';
              const db = getDevPool();

              if (id) {
                const tip = await getTipById(db, id);
                res.setHeader('Content-Type', 'application/json');
                if (!tip) {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Tip not found' }));
                  return;
                }
                res.end(JSON.stringify(tip));
                return;
              }

              const search = (url.searchParams.get('search') || '').trim();
              const selectedCategory =
                url.searchParams.get('selectedCategory') || '';

              const data = await listTips(db, search, selectedCategory);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to fetch tips' }));
            }
          });

          server.middlewares.use('/api/admin/tips', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');

            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              res.end();
              return;
            }

            if (!isAdminAuthorized(req)) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: 'Unauthorized' }));
              return;
            }

            try {
              const db = getDevPool();
              const url = new URL(req.url || '', 'http://localhost');
              const id = url.searchParams.get('id') || '';

              if (req.method === 'GET') {
                const data = await listTips(db, '', '');
                res.end(JSON.stringify(data));
                return;
              }

              if (req.method === 'POST') {
                const input = toTipInput(await readJsonBody(req));
                if (!input.tip) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Title (tip) is required' }));
                  return;
                }
                const created = await createTip(db, input);
                res.statusCode = 201;
                res.end(JSON.stringify(created));
                return;
              }

              if (req.method === 'PUT') {
                if (!id) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'id is required' }));
                  return;
                }
                const input = toTipInput(await readJsonBody(req));
                if (!input.tip) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Title (tip) is required' }));
                  return;
                }
                const updated = await updateTip(db, id, input);
                if (!updated) {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Tip not found' }));
                  return;
                }
                res.end(JSON.stringify(updated));
                return;
              }

              if (req.method === 'DELETE') {
                if (!id) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'id is required' }));
                  return;
                }
                const ok = await deleteTip(db, id);
                if (!ok) {
                  res.statusCode = 404;
                  res.end(JSON.stringify({ error: 'Tip not found' }));
                  return;
                }
                res.end(JSON.stringify({ ok: true }));
                return;
              }

              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Admin tips request failed' }));
            }
          });
        },
      },
      {
        name: 'spa-github-pages-fallback',
        closeBundle() {
          const index = resolve(rootDir, 'dist/index.html');
          const fallback = resolve(rootDir, 'dist/404.html');
          try {
            copyFileSync(index, fallback);
          } catch {
            // dist may be missing in some environments
          }
        },
      },
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
