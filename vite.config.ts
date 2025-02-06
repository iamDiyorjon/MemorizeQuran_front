import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Make sure this points correctly
    },
  },
  server: {
    host: true,
    port: 5180,
  },
  plugins: [react(), tsconfigPaths()],
});
