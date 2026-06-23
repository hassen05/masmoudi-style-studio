import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/masmoudi-style-studio/",

  tanstackStart: {
    server: { entry: "server" },
    clientEntry: "src/entry-client.tsx",
  },

  vite: {
    // keep this for other Vite overrides ONLY
  },
});