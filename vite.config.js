import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path"
import API_BASE_URL from './src/services/apiConfig';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': API_BASE_URL,
    },
  },
});
