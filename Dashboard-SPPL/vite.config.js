import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

// Determine if running in GitHub Pages (build mode)
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/SPPL/Dashboard-SPPL/" : "/", // ✅ Works on localhost & GitHub Pages
}));
