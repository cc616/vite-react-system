import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// @ts-ignore
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      // @ts-ignore
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': 'red',
        },
      },
    },
  },
  plugins: [reactRefresh()]
})
