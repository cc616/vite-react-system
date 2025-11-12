import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-react-system/',
  server: {
    host: true,
    port: 8080,
    proxy: {
      '/vite-react-system/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vite-react-system/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  plugins: [react()],
});
