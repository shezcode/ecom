<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '@/components/products/ProductCard.vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card-title class="text-h4 my-4">Products</v-card-title>
      </v-col>
    </v-row>
    <v-row v-if="productStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <div>Loading products...</div>
      </v-col>
    </v-row>
    <v-row v-else-if="productStore.error">
      <v-col cols="12">
        <v-alert type="error">{{ productStore.error }}</v-alert>
      </v-col>
    </v-row>
    <v-row v-else-if="productStore.products.length === 0">
      <v-col cols="12">
        <v-alert type="info">No products found.</v-alert>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="product in productStore.products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="product"></ProductCard>
      </v-col>
    </v-row>
  </v-container>
</template>
