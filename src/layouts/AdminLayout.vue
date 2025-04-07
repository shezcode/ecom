<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import NavBar from '@/components/NavBar.vue';
import AdminSidebar from '@/components/AdminSidebar.vue';
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
