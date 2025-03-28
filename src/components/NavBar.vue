<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/products">Products</RouterLink>
    <RouterLink to="/categories">Categories</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
</style>
