import api from '@/services/api';
import type { Product } from '@/types/product';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await api.get('/products');
        this.products = response.data;
      } catch (err) {
        this.error = 'Failed fetching all products';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
