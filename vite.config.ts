import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const rootDir = dirname(fileURLToPath(import.meta.url));

const sanityClient = createClient({
  projectId: 'w8a3f9tu',
  dataset: 'data',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const TIPS_QUERY = `*[
  _type == "Blog" &&
  (
    $search == "" ||
    tip match $search ||
    tip_description match $search ||
    tip_category match $search
  ) &&
  (
    $selectedCategory == "" ||
    tip_category == $selectedCategory
  )
]{
  _id,
  _type,
  tip,
  tip_date,
  tip_category,
  tip_description,
} | order(tip_date desc)`;

// https://vitejs.dev/config/
export default defineConfig({
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
            const search = url.searchParams.get('search') || '';
            const selectedCategory =
              url.searchParams.get('selectedCategory') || '';

            const data = await sanityClient.fetch(TIPS_QUERY, {
              search: search ? `*${search}*` : '',
              selectedCategory,
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data ?? []));
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
});
