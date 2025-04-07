<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <div class="main-layout">
    <NavBar />
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
    <FooterComponent />
  </div>
</template>
