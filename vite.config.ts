import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },

  server: {
    fs: {
      allow: [
        // Erlaube explizit den Zugriff auf das Verzeichnis, in dem deine Bilder liegen
        'C:/Users/kreck/Documents/3 - Projekte Jobs/Herkules/5 - POS/24-09/my-imbiss-app-scss/static/'
      ]
    }
  }
});
