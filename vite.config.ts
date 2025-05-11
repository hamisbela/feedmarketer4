import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    historyApiFallback: true,
    fs: {
      // Allow serving files from project root, blog-content, and node_modules
      allow: ['.', 'blog-content', 'node_modules'],
      strict: false
    },
  },
  preview: {
    historyApiFallback: true,
  },
  assetsInclude: ['**/*.md', '**/*.jpg', '**/*.png', '**/*.gif', '**/*.jpeg', '**/*.webp'],
  publicDir: 'public',
  build: {
    rollupOptions: {
      // Make sure to exclude the zip files from the build
      external: [
        /\/blog-zips\/.*/
      ]
    }
  }
});