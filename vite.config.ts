import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const port = 4200
const host = 'bear-insights.local'

export default defineConfig({
  base: '/',
  build: {
    emptyOutDir: true,
    outDir: './dist',
    reportCompressedSize: true,
  },
  plugins: [react()],
  preview: { host, port },
  publicDir: './public',
  root: './',
  server: { host, port },
})
