<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const categoryStore = useCategoryStore();
const router = useRouter();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await categoryStore.fetchCategories();
  loading.value = false;
});

const viewCategoryProducts = (categoryId: number | string) => {
  router.push({
    path: '/products',
    query: { categoryId: categoryId.toString() },
  });
};

const getCategoryColor = (index: number) => {
  const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
  return colors[index % colors.length];
};
</script>

<template>
  <div>
    <h1 class="text-h4 mb-6 text-white">Categories</h1>

    <div v-if="loading">
      <v-skeleton-loader v-for="i in 4" :key="i" type="card" class="mb-4"></v-skeleton-loader>
    </div>

    <div v-else-if="categoryStore.error" class="text-center my-8">
      <v-alert type="error" class="mx-auto" max-width="500">
        {{ categoryStore.error }}
      </v-alert>
      <v-btn color="primary" class="mt-4" @click="categoryStore.fetchCategories">
        Try Again
        <v-icon end>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <div v-else-if="categoryStore.categories.length === 0" class="text-center my-8">
      <v-alert type="info" class="mx-auto" max-width="500"> No categories found. </v-alert>
    </div>

    <v-row v-else>
      <v-col
        v-for="(category, index) in categoryStore.categories"
        :key="category.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto category-card"
          height="220"
          @click="viewCategoryProducts(category.id)"
        >
          <v-card-item
            :class="`bg-${getCategoryColor(index)}`"
            height="120"
            class="d-flex align-center justify-center"
          >
            <v-icon :icon="category.icon" size="x-large" color="white"></v-icon>
          </v-card-item>

          <v-card-title class="text-center mt-2">
            {{ category.name }}
          </v-card-title>

          <v-card-subtitle class="text-center pb-0">
            {{ category.description }}
          </v-card-subtitle>

          <v-card-actions class="justify-center mt-2">
            <v-btn variant="text" color="primary" @click.stop="viewCategoryProducts(category.id)">
              Browse Products
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.category-card {
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2) !important;
}
</style>
