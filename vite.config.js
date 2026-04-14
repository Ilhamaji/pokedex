import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to repo name when building for GitHub Pages
  // VITE_BASE_PATH is injected by the GH Actions workflow
  base: process.env.VITE_BASE_PATH || '/',
})
