import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },

  esbuild: {
    drop: ["console", "debugger"],
    jsx: "transform",
    jsxDev: false,
    jsxImportSource: "@",
    jsxInject: `import { jsx } from '@/lib/jsx-runtime'`,
    jsxFactory: "jsx.component",
  },
});
