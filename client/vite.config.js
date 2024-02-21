import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port:5137,
    proxy: {
      '/api': {
        target: 'http://localhost:8800', // Specify the target host
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api') // Rewrite path
      }
    }
  }
});


