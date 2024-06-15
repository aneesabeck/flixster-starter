import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import.meta.env.VITE_API_KEY

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
})
