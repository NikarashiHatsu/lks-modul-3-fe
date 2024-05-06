import './assets/tailwind.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const pinia = createPinia();
const app = createApp(App).use(pinia);

app.use(router)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vite App';
  next();
});

app.mount('#app')
