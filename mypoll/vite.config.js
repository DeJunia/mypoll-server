import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mypollserver.vercel.app/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
