<script setup lang="ts">
import type { Product } from '@/types/product';
import { ref } from 'vue';

const props = defineProps<{
  product: Product;
}>();
const show = ref(false);
</script>

<template>
  <v-card class="mx-auto my-3 product-card" max-width="400">
    <v-img height="200" :src="props.product.imageUrl" cover :alt="props.product.name"></v-img>
    <v-card-title>{{ props.product.name }}</v-card-title>
    <v-card-subtitle>{{ props.product.price }}</v-card-subtitle>
    <v-card-text>
      <div>Category ID: {{ props.product.categoryId }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="flat">Add to Cart</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text> Example vuetify component</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.product-card {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}
</style>
