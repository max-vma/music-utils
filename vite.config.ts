import vue from '@vitejs/plugin-vue';
import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

// GitHub Pages project site is served from /<repo>/.
const REPO_BASE = '/music-utils/';

// Emits 404.html (SPA fallback for GitHub Pages) and .nojekyll after build.
function spaFallback(): Plugin {
  let outDir = 'dist';

  return {
    name: 'spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
      writeFileSync(resolve(outDir, '.nojekyll'), '');
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), spaFallback()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: mode === 'production' ? REPO_BASE : '/',
}));
