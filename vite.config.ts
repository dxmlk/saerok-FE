import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://3.34.90.203:8080",
        changeOrigin: true,
      },
    },
  },
});
