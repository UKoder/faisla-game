import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp}'],
      },
      manifest: {
        name: 'Faisla - Farmer Decision Game',
        short_name: 'Faisla',
        start_url: '/',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#16a34a',
        icons: [],
      },
    }),
  ],
})
