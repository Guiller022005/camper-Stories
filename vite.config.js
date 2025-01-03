import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import API_BASE_URL from './src/apiConfig';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': API_BASE_URL,
    },
  },
});
