import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "ignore-fs-face-api",
      enforce: "pre",
      resolveId(source) {
        if (source === "fs") {
          return "\0ignore-fs";
        }
        return null;
      },
      load(id) {
        if (id === "\0ignore-fs") {
          return "export default {}";
        }
        return null;
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
