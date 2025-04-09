import api from '@/services/api';
import type { Product } from '@/types/product';
import { defineStore } from 'pinia';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    formattedPrice: (state) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(state.items.reduce((total, item) => total + item.product.price * item.quantity, 0));
    },
  },
  actions: {
    addToCart(product: Product, quantity = 1) {
      const existingItem = this.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      this.saveToLocalStorage();
    },
    removeFromCart(productId: string | number) {
      const index = this.items.findIndex((item) => item.product.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    updateQuantity(productId: string | number, quantity: number) {
      const item = this.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          this.saveToLocalStorage();
        }
      }
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
  },
});
