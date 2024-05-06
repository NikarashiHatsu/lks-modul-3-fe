import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
  }),
  actions: {
    setCredentials(token, user) {
      this.accessToken = token;
      this.user = user;

      localStorage.setItem('accessToken', this.accessToken);
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    clearAccessToken() {
      this.accessToken = null;
      this.user = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.accessToken;
    },
  }
});