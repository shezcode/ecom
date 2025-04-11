import type { LoginCredentials } from '@/types/auth';
import { defineStore } from 'pinia';
import router from '@/router';
import api from '@/services/api';
import type { User } from '@/types/user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    isAuthenticated: localStorage.getItem('token') !== null,
    error: null as string | null,
    loading: false,
  }),
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isUser: (state) => state.user?.role === 'user',
    userFullName: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : ''),
  },
  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(
          `/users?username=${credentials.username}&password=${credentials.password}`,
        );

        if (response.data && response.data.length > 0) {
          const user = response.data[0];
          this.user = user;
          this.userId = user.id;
          this.token = `JWT-TOKEN-${Math.random().toString(36).substring(2)}`;
          this.isAuthenticated = true;

          // Store both token and userId in localStorage
          localStorage.setItem('token', this.token);
          localStorage.setItem('userId', user.id);

          if (user.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/');
          }
        } else {
          this.error = 'Invalid username or password';
        }
      } catch (err) {
        this.error = 'Error during login';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.userId = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      router.push('/login');
    },

    async checkAuth() {
      if (!this.token || !this.userId) {
        this.logout();
        return;
      }

      this.loading = true;
      try {
        const response = await api.get(`/users/${this.userId}`);
        this.user = response.data;
        this.isAuthenticated = true;
      } catch (err) {
        console.error('failed to verify auth: ', err);
        this.logout();
      } finally {
        this.loading = false;
      }
    },
  },
});
