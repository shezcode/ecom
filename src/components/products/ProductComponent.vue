<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '@/components/products/ProductCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { searchService } from '@/services/searchService';
import type { Product } from '@/types/product';

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const searchResults = ref<Product[]>([]);
const isSearching = ref(false);
const error = ref<null | string>(null);
const loading = ref(false);

// Handle initial load and search query
onMounted(async () => {
  const query = (route.query.search as string) || null;
  if (query) {
    searchQuery.value = query;
    await performSearch(query);
  } else {
    loading.value = true;
    await productStore.fetchProducts();
    loading.value = false;
  }
});

// Watch for route changes to update search results
watch(
  () => route.query.search,
  async (newQuery) => {
    const query = (newQuery as string) || null;
    searchQuery.value = query || '';

    if (query) {
      await performSearch(query);
    } else {
      isSearching.value = false;
      searchResults.value = [];

      // If products aren't loaded yet, load them
      if (productStore.products.length === 0 && !productStore.loading) {
        loading.value = true;
        await productStore.fetchProducts();
        loading.value = false;
      }
    }
  },
);

async function performSearch(query: string) {
  isSearching.value = true;
  loading.value = true;
  error.value = null;

  try {
    searchResults.value = await searchService.searchProducts(query);
  } catch (err) {
    console.error('Search error:', err);
    error.value = 'Failed to search products';
  } finally {
    loading.value = false;
  }
}

function clearSearch() {
  router.push({ path: '/products' });
  searchQuery.value = '';
  isSearching.value = false;
  searchResults.value = [];
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card-title class="text-h4 my-4 text-white">Products</v-card-title>

        <!-- Show search query if present -->
        <v-card v-if="searchQuery" class="mb-4 pa-3" variant="outlined">
          <div class="d-flex align-center">
            <div>
              <span class="text-body-1">
                Search results for: <strong>"{{ searchQuery }}"</strong>
              </span>
              <div class="text-caption" v-if="!loading">
                {{ isSearching ? searchResults.length : productStore.products.length }} products
                found
              </div>
            </div>
            <v-spacer></v-spacer>
            <v-btn @click="clearSearch" variant="text" prepend-icon="mdi-close">
              Clear Search
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Search field for additional filtering -->
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          label="Search products..."
          single-line
          @keyup.enter="
            router.push({
              path: '/products',
              query: { search: searchQuery.trim() },
            })
          "
          hide-details
          class="mb-4"
        >
          <template v-slot:append>
            <v-btn
              icon
              @click="
                router.push({
                  path: '/products',
                  query: { search: searchQuery.trim() },
                })
              "
              variant="text"
              v-if="searchQuery"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon @click="clearSearch" variant="text" v-if="searchQuery">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="loading || productStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <div class="text-white">Loading products...</div>
      </v-col>
    </v-row>

    <v-row v-else-if="error || productStore.error">
      <v-col cols="12">
        <v-alert type="error">{{ error || productStore.error }}</v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="isSearching && searchResults.length === 0">
      <v-col cols="12">
        <v-alert type="info"> No products found matching "{{ searchQuery }}". </v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="!isSearching && productStore.products.length === 0">
      <v-col cols="12">
        <v-alert type="info"> No products available. </v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="product in isSearching ? searchResults : productStore.products"
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
