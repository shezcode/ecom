<script setup lang="ts">
import AdminNavBar from '@/components/admin/AdminNavbar.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { ref } from 'vue';

const drawer = ref(true);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<template>
  <div class="admin-layout">
    <AdminNavBar @toggle-drawer="toggleDrawer" />

    <v-layout class="fill-height">
      <v-navigation-drawer
        v-model="drawer"
        :permanent="$vuetify.display.mdAndUp"
        :temporary="!$vuetify.display.mdAndUp"
        color="surface"
        width="260"
      >
        <AdminSidebar />
      </v-navigation-drawer>

      <v-main class="admin-main">
        <v-container fluid>
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
  display: flex;
  flex-direction: column;
}

.fill-height {
  flex: 1 1 auto;
  display: flex;
}

.admin-main {
  flex-grow: 1;
  padding: 16px;
}

@media (min-width: 960px) {
  .v-navigation-drawer {
    position: relative !important;
    transform: translateX(0) !important;
    visibility: visible !important;
  }
}

:deep(.v-navigation-drawer__content) {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
