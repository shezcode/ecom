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
      this.error = null;

      try {
        const response = await api.get('/products');
        this.products = response.data;
      } catch (err) {
        this.error = 'Failed fetching products';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id: string | number) {
      try {
        const response = await api.get(`/products/${id}`);
        return response.data;
      } catch (err) {
        console.error(`Failed fetching product with ID ${id}:`, err);
        throw err;
      }
    },

    async fetchProductsByCategory(categoryId: string | number) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get(`/products?categoryId=${categoryId}`);
        this.products = response.data;
      } catch (err) {
        this.error = 'Failed fetching products by category';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
