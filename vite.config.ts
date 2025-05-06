import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevMode = mode == "development";
  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: isDevMode
      ? {
          exclude: ["@electric-sql/pglite", "@electric-sql/pglite-react"],
        }
      : {
          include: ["@electric-sql/pglite", "@electric-sql/pglite-react"],
        },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    worker: {
      format: "es",
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          format: "es",
          manualChunks: {
            pglite: ["@electric-sql/pglite", "@electric-sql/pglite-react"],
          },
        },
      },
    },
  };
});
