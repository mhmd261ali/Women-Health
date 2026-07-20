import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-github-pages-fallback',
      closeBundle() {
        // GitHub Pages serves 404.html for unknown paths — copy index so /blog works
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
