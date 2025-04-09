<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useCartStore } from './stores/cartStore';

const authStore = useAuthStore();
const cartStore = useCartStore();

onMounted(() => {
  if (authStore.token) {
    authStore.checkAuth();
  }

  cartStore.loadFromLocalStorage();
});
</script>
