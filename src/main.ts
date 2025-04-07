import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import '@/assets/backgroundPattern.css';
import '@/assets/neobrut.css';

loadFonts();

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app');
