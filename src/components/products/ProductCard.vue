<script setup lang="ts">
import type { Product } from '@/types/product';
import { ref } from 'vue';

const props = defineProps<{
  product: Product;
}>();
const show = ref(false);
</script>

<template>
  <v-card class="mx-auto my-3" max-width="400">
    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-img>
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
