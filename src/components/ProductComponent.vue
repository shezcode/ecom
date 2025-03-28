<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div>
    <h1>This is products</h1>
    <div v-if="productStore.loading">Loading products...</div>
    <div v-else-if="productStore.error">Error: {{ productStore.error }}</div>
    <div v-else-if="productStore.products.length === 0">No products found</div>
    <div v-else>
      <div v-for="product in productStore.products" :key="product.id">
        <div>{{ product.name }}</div>
        <div>${{ product.price }}</div>
      </div>
    </div>
  </div>
</template>
