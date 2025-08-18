import type { LoginCredentials } from '@/types/auth';
import { defineStore } from 'pinia';
import router from '@/router';
import api from '@/services/api';
import type { User } from '@/types/user';
import { useCartStore } from './cartStore';

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

    async register(userData: Omit<User, 'id'>) {
      this.loading = true;
      this.error = null;
      try {
        // Check if username exists using your backend route
        try {
          const usernameResponse = await api.get(`/users/username/${userData.username}`);
          // If we get a response (not 404), username exists
          if (usernameResponse.data) {
            this.error = 'Username already exists';
            return;
          }
        } catch (usernameError: any) {
          // 404 is good - means username doesn't exist
          if (usernameError.response?.status !== 404) {
            throw usernameError; // Re-throw if it's not a 404
          }
        }

        // Check if email exists using your backend route
        try {
          const emailResponse = await api.get(`/users/email/${userData.email}`);
          // If we get a response (not 404), email exists
          if (emailResponse.data) {
            this.error = 'Email already exists';
            return;
          }
        } catch (emailError: any) {
          // 404 is good - means email doesn't exist
          if (emailError.response?.status !== 404) {
            throw emailError; // Re-throw if it's not a 404
          }
        }

        // Create new user (your backend handles ID generation)
        const response = await api.post('/users', userData);

        console.log('User created successfully:', response.data);

        // Registration successful
        this.error = null;
      } catch (err: any) {
        console.error('Registration error:', err);
        this.error = err.response?.data?.error || 'Error during registration';
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

      const cartStore = useCartStore();
      cartStore.clearCart();
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
