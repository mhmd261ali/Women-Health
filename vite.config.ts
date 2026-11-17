import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { getTipById, listTips } from './api/lib/tips';

const rootDir = dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '');
  const connectionString = env.DATABASE_URL || process.env.DATABASE_URL;

  let pool: pg.Pool | null = null;
  const getDevPool = () => {
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set (add it to .env for local /api/tips)');
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
