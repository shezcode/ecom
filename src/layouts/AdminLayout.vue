<script setup lang="ts">
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div class="admin-layout">
    <NavBar />
    <v-layout>
      <v-navigation-drawer permanent>
        <AdminSidebar />
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <slot></slot>
        </v-container>
      </v-main>
    </v-layout>
    <FooterComponent />
  </div>
</template>

<style scoped>
.admin-layout {
  background: radial-gradient(circle at center, #344a64 0%, #0d1b2a 100%);
  min-height: 100vh;
}
</style>
