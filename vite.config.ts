import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: {
      host: 'shez-linux',
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vuetify({ autoImport: true }), // This is important!
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
