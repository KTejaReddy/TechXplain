import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static frontend only: no backend, no API calls, no env config.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
