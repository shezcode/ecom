<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types/product';
import { createDocumentRegistry } from 'typescript';
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
  <div>Product detail comp</div>
</template>
