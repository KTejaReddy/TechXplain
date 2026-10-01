import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static frontend only: no backend, no API calls, no env config.
// Absolute base so deep links served through the SPA rewrite (e.g. /concept/api)
// still load /assets/* from the site root instead of /concept/assets/*.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
