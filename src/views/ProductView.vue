<template>
  <NavBar />
  <ProductComponent />
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';
import ProductComponent from '@/components/products/ProductComponent.vue';
import { defineComponent } from 'vue';

// Components

export default defineComponent({
  name: 'ProductView',

  components: {
    NavBar,
    ProductComponent,
  },
});
</script>
