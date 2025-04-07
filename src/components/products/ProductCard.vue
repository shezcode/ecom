<script setup lang="ts">
import type { Product } from '@/types/product';
import { ref } from 'vue';

const props = defineProps<{
  product: Product;
}>();
const show = ref(false);
</script>

<template>
  <v-card class="mx-auto my-3 shadow neobrut-card" max-width="400">
    <v-img height="200" :src="props.product.imageUrl" cover :alt="props.product.name"></v-img>
    <v-card-title class="neobrut-title">{{ props.product.name }}</v-card-title>
    <v-card-subtitle class="neobrut-purple">{{ props.product.price }}</v-card-subtitle>
    <v-card-text class="neobrut-orange">
      <div>Category ID: {{ props.product.categoryId }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="flat" class="neobrut-btn neobrut-green">Add to Cart</v-btn>
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
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
