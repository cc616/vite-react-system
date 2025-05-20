import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
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
