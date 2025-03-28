<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<template>
  <div>
    <h1>This is categories</h1>
    <div v-if="categoryStore.loading">Loading categories...</div>
    <div v-else-if="categoryStore.error">{{ categoryStore.error }}</div>
    <div v-else-if="categoryStore.categories.length === 0">No categories found</div>
    <div v-else>
      <div v-for="category in categoryStore.categories" :key="category.id">
        <div>{{ category.name }}</div>
      </div>
    </div>
  </div>
</template>
