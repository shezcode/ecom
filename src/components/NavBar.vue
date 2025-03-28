<template>
  <v-app-bar color="primary" dark app>
    <v-app-bar-title>
      <span class="font-weight-bold">ECOM</span>
    </v-app-bar-title>

    <div class="d-flex align-center justify-around">
      <v-btn v-for="item in navItems" :key="item.title" :to="item.to" class="mx-2" variant="text">
        <v-icon start :icon="item.icon"></v-icon>
        {{ item.title }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon icon="mdi-cart"></v-icon>
      <v-badge
        v-if="cartItemCount > 0"
        :content="cartItemCount"
        color="error"
        offset-x="12"
        offset-y="12"
      ></v-badge>
    </v-btn>

    <v-btn icon class="ml-2">
      <v-icon icon="mdi-account"></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Navigation items with icons
const navItems = [
  { title: 'Home', to: '/', icon: 'mdi-home' },
  { title: 'Products', to: '/products', icon: 'mdi-shopping' },
  { title: 'Categories', to: '/categories', icon: 'mdi-shape' },
  { title: 'About', to: '/about', icon: 'mdi-information' },
];

// Simulated cart items count (you'll connect this to your store later)
const cartItemCount = ref(3);
</script>
