import api from '@/services/api';
import type { Category } from '@/types/category';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchCategories() {
      this.loading = true;
      try {
        const response = await api.get('/categories');
        this.categories = response.data;
      } catch (err) {
        this.error = 'Failed fetching all products';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
