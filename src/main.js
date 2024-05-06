import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vite App';
  next();
});

app.mount('#app')
