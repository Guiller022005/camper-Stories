import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': process.env.VITE_API_BASE_URL, 
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:3000', // Usa un valor predeterminado si no está definido
        changeOrigin: true,
        secure: false,
      },
    },
  },
});