import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/Auth/LoginView.vue'
import { useAuthStore } from '@/store/auth'
import app from '@/config/app';
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home',
      },
      component: HomeView
    },

    {
      path: '/auth/logout',
      name: 'auth.logout',
      beforeEnter: async (to, from, next) => {
        if (useAuthStore().isAuthenticated) {
          await axios.post(
              `${app.apiUrl}/api/v1/auth/logout`,
              {},
              {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${useAuthStore().accessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              useAuthStore().clearAccessToken();
            });
        }

        next('/');
      }
    },
    {
      path: '/auth/login',
      name: 'auth.login',
      meta: {
        title: 'Login',
      },
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if (useAuthStore().isAuthenticated) {
          router.push('/');
        }

        next();
      },
    },
  ]
})

export default router
