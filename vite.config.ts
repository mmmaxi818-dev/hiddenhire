import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { anthropicPlugin } from './vite-plugin-anthropic.ts'
import { reviewsPlugin } from './vite-plugin-reviews.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), anthropicPlugin(), reviewsPlugin()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    allowedHosts: true,
  },
})
