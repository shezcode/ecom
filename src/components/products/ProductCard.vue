<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types/product';
import { computed, ref } from 'vue';

const props = defineProps<{
  product: Product;
}>();
const show = ref(false);
const cartStore = useCartStore();
const quantity = ref(1);
const showSnackbar = ref(false);

const addToCart = () => {
  cartStore.addToCart(props.product, quantity.value);
  showSnackbar.value = true;
  setTimeout(() => {
    showSnackbar.value = false;
  }, 3000);
};

const formattedPrice = computed(() => {
  const price =
    typeof props.product.price === 'string' ? parseFloat(props.product.price) : props.product.price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
});
</script>

<template>
  <v-card class="mx-auto my-3 product-card h-100 d-flex flex-column" max-width="400">
    <div class="cursor-pointer" @click="$router.push(`/products/${props.product.id}`)">
      <v-img
        height="200"
        :src="props.product.image || '/api/placeholder/400/200'"
        cover
        :alt="props.product.name"
      ></v-img>
    </div>
    <v-card-title>{{ props.product.name }}</v-card-title>
    <v-card-subtitle>{{ formattedPrice }}</v-card-subtitle>
    <v-card-text class="flex-grow-1">
      <div class="mb-2">
        {{ props.product.description.substring(0, 50)
        }}{{ props.product.description.length > 50 ? '...' : '' }}
      </div>
      <div class="d-flex align-center">
        <div class="text-caption text-grey">In stock: {{ props.product.stock }}</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" variant="flat" @click="addToCart" prepend-icon="mdi-cart-plus">
        Add to Cart
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text class="d-flex flex-row">
          <div class="d-flex align-center">
            <v-rating
              :model-value="4"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            ></v-rating>
            <span class="text-caption text-grey ms-2">(4.0)</span>
          </div>
          <v-btn
            class="d-flex align-center"
            variant="flat"
            @click="$router.push(`/products/${props.product.id}`)"
            >details</v-btn
          >
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

  <v-snackbar v-model="showSnackbar" :timeout="3000" color="success">
    <div class="d-flex align-center">
      <v-icon class="mr-2">mdi-check-circle</v-icon>
      <span>{{ props.product.name }} added to cart!</span>
    </div>
  </v-snackbar>
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

.cursor-pointer {
  cursor: pointer;
}
</style>
