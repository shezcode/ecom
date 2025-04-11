<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types/product';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const quantity = ref(1);
const showSnackbar = ref(false);

const productId = computed(() => route.params.id);
const category = computed(() => {
  if (!product.value || categoryStore.categories.length === 0) return null;

  return categoryStore.categories.find(
    (cat) => cat.id.toString() === product.value?.categoryId.toString(),
  );
});

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;

  try {
    if (categoryStore.categories.length === 0) {
      await categoryStore.fetchCategories();
    }

    const data = await productStore.fetchProductById(productId.value);
    product.value = data;
  } catch (err) {
    console.error('Error fetching product: ', err);
    error.value = 'Failed to load product details';
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  if (!product.value) return;

  cartStore.addToCart(product.value, quantity.value);
  showSnackbar.value = true;

  setTimeout(() => {
    showSnackbar.value = false;
  }, 3000);
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div class="product-detail">
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <div class="mt-4 text-white">Loading product details...</div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-8">
      <v-alert type="error" variant="tonal" class="mx-auto" max-width="500">
        {{ error }}
        <template v-slot:append>
          <v-btn color="error" variant="text" @click="fetchProduct"> Retry </v-btn>
        </template>
      </v-alert>
      <v-btn color="primary" class="mt-4" @click="goBack"> Back to Products </v-btn>
    </div>

    <!-- Product details -->
    <template v-else-if="product">
      <!-- Back button -->
      <v-btn
        color="primary"
        variant="text"
        @click="goBack"
        class="mb-4"
        prepend-icon="mdi-arrow-left"
      >
        Back to Products
      </v-btn>

      <v-card class="product-detail-card">
        <v-row>
          <!-- Product Image -->
          <v-col cols="12" md="6">
            <v-img
              :src="product.image || '/api/placeholder/600/400'"
              height="400"
              cover
              class="rounded"
              :alt="product.name"
            ></v-img>
          </v-col>

          <!-- Product Information -->
          <v-col cols="12" md="6">
            <v-card-title class="text-h4">{{ product.name }}</v-card-title>

            <v-card-subtitle class="text-h5 pt-2">{{ formattedPrice }}</v-card-subtitle>

            <v-card-text>
              <!-- Category badge -->
              <v-chip
                v-if="category"
                color="primary"
                class="mb-4"
                :prepend-icon="category.icon"
                @click="router.push(`/categories?id=${category.id}`)"
              >
                {{ category.name }}
              </v-chip>

              <!-- Description -->
              <div class="text-body-1 my-4">{{ product.description }}</div>

              <!-- Stock info -->
              <div class="d-flex align-center mb-4">
                <v-icon :color="product.stock > 0 ? 'success' : 'error'" class="mr-2">
                  {{ product.stock > 0 ? 'mdi-check-circle' : 'mdi-alert-circle' }}
                </v-icon>
                <span>
                  {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
                </span>
              </div>

              <!-- Quantity selector -->
              <div v-if="product.stock > 0">
                <div class="text-body-1 mb-2">Quantity:</div>
                <v-card variant="outlined" width="140" class="mb-6">
                  <div class="d-flex align-center justify-space-between pa-2">
                    <v-btn
                      icon
                      variant="text"
                      density="comfortable"
                      @click="quantity = Math.max(1, quantity - 1)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>

                    <span class="text-h6">{{ quantity }}</span>

                    <v-btn
                      icon
                      variant="text"
                      density="comfortable"
                      @click="quantity = Math.min(product.stock, quantity + 1)"
                      :disabled="quantity >= product.stock"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </v-card>

                <!-- Add to cart button -->
                <v-btn
                  color="primary"
                  size="large"
                  block
                  @click="addToCart"
                  prepend-icon="mdi-cart-plus"
                >
                  Add to Cart
                </v-btn>
              </div>

              <!-- Out of stock message -->
              <v-alert v-else type="error" variant="tonal" class="mt-4">
                This product is currently out of stock.
              </v-alert>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- Additional product details -->
        <v-divider class="my-4"></v-divider>

        <v-card-text>
          <h3 class="text-h6 mb-3">Product Details</h3>
          <v-row>
            <v-col cols="12" md="6">
              <div class="mb-2"><strong>Product ID:</strong> {{ product.id }}</div>
              <div class="mb-2">
                <strong>Added:</strong> {{ new Date(product.createdAt).toLocaleDateString() }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="mb-2">
                <strong>Category:</strong> {{ category ? category.name : 'Uncategorized' }}
              </div>
              <div>
                <strong>Availability:</strong> {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Related products would go here -->
    </template>

    <!-- No product found state -->
    <div v-else class="text-center py-8">
      <v-alert type="warning" variant="tonal" class="mx-auto" max-width="500">
        Product not found
      </v-alert>
      <v-btn color="primary" class="mt-4" @click="goBack"> Back to Products </v-btn>
    </div>

    <!-- Success snackbar -->
    <v-snackbar v-model="showSnackbar" :timeout="3000" color="success">
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        <span>{{ product?.name }} added to cart!</span>
      </div>
    </v-snackbar>
  </div>
</template>

<style scoped>
.product-detail {
  padding-bottom: 32px;
}

.product-detail-card {
  overflow: hidden;
}

@media (max-width: 600px) {
  .product-detail-card {
    padding: 16px;
  }
}
</style>
