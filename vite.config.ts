/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      template: "public/index.html",
      inject: {
        data: {
          title: "index",
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
  test: {
    globals: true, // ✅ enables test(), expect(), describe(), vi() globally
    environment: "jsdom", // ✅ simulates browser environment
    setupFiles: "./src/setupTests.ts", // ✅ runs before tests
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"], // optional glob
    css: true, // allow CSS imports during tests
    coverage: {
      provider: "v8", // built-in coverage provider (no extra dependency)
      reporter: ["text", "json", "html"], // optional coverage report formats
    },
  },
  server: {
    port: 3030, // Specify your desired port
    open: true, // Automatically open the browser
  },
});
