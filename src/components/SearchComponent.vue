<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  placeholder?: string;
  dense?: boolean;
}>();

const searchQuery = ref('');
const router = useRouter();

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value },
    });
    searchQuery.value = '';
  }
};
</script>

<template>
  <v-text-field
    v-model="searchQuery"
    variant="solo"
    prepend-inner-icon="mdi-magnify"
    :label="props.placeholder || 'Search'"
    single-line
    hide-details
    @keyup.enter="search"
    class="search-input"
    :density="props.dense ? 'compact' : 'default'"
  ></v-text-field>
</template>

<style scoped>
.search-input {
  max-width: 300px;
}
</style>
