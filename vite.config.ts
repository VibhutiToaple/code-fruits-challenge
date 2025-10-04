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
  server: {
    port: 3030, // Specify your desired port
    open: true, // Automatically open the browser
  },
});
