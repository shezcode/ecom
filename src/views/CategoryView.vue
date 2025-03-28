<template>
  <NavBar />
  <CategoryComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import CategoryComponent from '@/components/CategoryComponent.vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  name: 'CategoryView',

  components: {
    NavBar,
    CategoryComponent,
  },
});
</script>
