import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "resources/js"),
    },
  },
  build: {
    manifest: true,
    copyPublicDir: false,
    outDir: "public/build",
    rollupOptions: {
      input: "resources/js/app.jsx",
    },
  },
  server: {
    origin: "http://localhost:5173",
  },
});
