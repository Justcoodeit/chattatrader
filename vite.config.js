import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://api.chattatrader.com/',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    // exclude: ['path', 'fs', 'url', 'source-map-js'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
