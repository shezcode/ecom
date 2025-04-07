<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <div class="main-layout d-flex flex-column min-vh-100">
    <NavBar />
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
