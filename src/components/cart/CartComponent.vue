<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const isEmpty = computed(() => cartStore.items.length === 0);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const continueShopping = () => {
  router.push('/products');
};

const checkout = () => {
  // In a real app, this would navigate to checkout or process the order
  alert('Checkout functionality would go here!');
};
</script>

<template>
  <div class="cart-page">
    <h1 class="text-h4 mb-6 text-white">Shopping Cart</h1>

    <v-card v-if="isEmpty" class="text-center pa-6">
      <v-icon size="64" color="grey" class="mb-4">mdi-cart-outline</v-icon>
      <h2 class="text-h5 mb-4">Your cart is empty</h2>
      <p class="mb-6">Looks like you haven't added any products to your cart yet.</p>
      <v-btn color="primary" size="large" @click="continueShopping">
        Start Shopping
        <v-icon class="ms-2">mdi-arrow-right</v-icon>
      </v-btn>
    </v-card>

    <div v-else>
      <v-card class="mb-6">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-center">Quantity</th>
              <th class="text-right">Price</th>
              <th class="text-right">Total</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartStore.items" :key="item.product.id">
              <td>
                <div class="d-flex align-center">
                  <v-img
                    :src="item.product.image || '/api/placeholder/60/60'"
                    width="60"
                    height="60"
                    class="rounded me-3"
                  ></v-img>
                  <div>
                    <div class="font-weight-medium">{{ item.product.name }}</div>
                    <div class="text-caption">
                      {{ item.product.description.substring(0, 30) }}...
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-center">
                <div class="d-flex align-center justify-center">
                  <v-btn
                    icon
                    variant="text"
                    density="compact"
                    @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-btn
                    icon
                    variant="text"
                    density="compact"
                    @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                    :disabled="item.quantity >= item.product.stock"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </td>
              <td class="text-right">{{ formatPrice(item.product.price) }}</td>
              <td class="text-right">{{ formatPrice(item.product.price * item.quantity) }}</td>
              <td class="text-center">
                <v-btn
                  icon
                  variant="text"
                  color="error"
                  density="compact"
                  @click="cartStore.removeFromCart(item.product.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Cart Summary -->
      <div class="d-flex flex-column flex-md-row align-md-center justify-space-between">
        <v-btn variant="outlined" class="mb-4 mb-md-0" @click="continueShopping">
          <v-icon start>mdi-arrow-left</v-icon>
          Continue Shopping
        </v-btn>

        <v-card width="300" class="pa-4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Order Summary</h3>
          <v-divider class="mb-4"></v-divider>

          <div class="d-flex justify-space-between mb-2">
            <span>Subtotal:</span>
            <span class="font-weight-medium">{{ cartStore.formattedTotalPrice }}</span>
          </div>

          <div class="d-flex justify-space-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-space-between mb-4">
            <span class="text-subtitle-1 font-weight-bold">Total:</span>
            <span class="text-subtitle-1 font-weight-bold">{{
              cartStore.formattedTotalPrice
            }}</span>
          </div>

          <v-btn color="primary" block @click="checkout">
            Proceed to Checkout
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>

          <v-btn color="error" variant="text" block class="mt-2" @click="cartStore.clearCart">
            <v-icon start>mdi-delete</v-icon>
            Clear Cart
          </v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 80vh;
}
</style>
