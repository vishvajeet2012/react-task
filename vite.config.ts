import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget =
    env.FASTOR_PROXY_TARGET?.trim() || 'https://staging.fastor.ai'

  return {
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'Fastor',
          short_name: 'Fastor',
          description: 'Sign up to Fastor and discover nearby favourites.',
          theme_color: '#ff5701',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '/pwa-192.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
            },
            {
              src: '/pwa-512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
        },
      }),
    ],
  }
})
