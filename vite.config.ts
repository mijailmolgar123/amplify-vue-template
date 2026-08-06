import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    // Amplify's SPA rewrite currently serves index.html for .woff2 requests.
    // Keep the Font Awesome fonts inside the compiled CSS so icons remain
    // reliable in production without depending on separate font URLs.
    assetsInlineLimit(filePath) {
      if (filePath.endsWith('.woff2')) return true
      return undefined
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  }
})
