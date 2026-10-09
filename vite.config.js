import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Illustration components ported from Framer import "framer" for property controls.
    alias: [{ find: /^framer$/, replacement: fileURLToPath(new URL('./src/site/art/framer-shim.js', import.meta.url)) }],
  },
  server: {
    port: 3000,
    host: true,
    open: false,
    watch: {
      usePolling: true
    }
  }
})
