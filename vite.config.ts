import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://server.transcendence.fr/",
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
