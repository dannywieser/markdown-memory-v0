import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const port = 4200
const host = 'bear-insights.local'

export default defineConfig({
  assetsInclude: ['**/*.json'],
  base: '/',
  build: {
    emptyOutDir: true,
    outDir: './dist/ui',
    reportCompressedSize: true,
  },
  plugins: [react()],
  preview: { port },
  publicDir: './public',
  root: './',
  server: { host, port },
})
