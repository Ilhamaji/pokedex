import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use VITE_BASE_PATH for GitHub Pages (subfolder) 
  // and default to '/' for Netlify (root domain)
  base: process.env.VITE_BASE_PATH || "/",
});
