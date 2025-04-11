<template>
  <v-app-bar color="secondary" app dark elevation="4">
    <div class="d-flex align-center justify-space-between w-100 px-4">
      <!-- Left side: Logo and menu icon -->
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="toggleDrawer" class="d-md-none mr-2"></v-app-bar-nav-icon>

        <v-app-bar-title class="d-flex align-center">
          <v-icon icon="mdi-shield-account" class="mr-2"></v-icon>
          <router-link to="/admin/dashboard" class="text-white text-decoration-none">
            Admin Dashboard
          </router-link>
        </v-app-bar-title>
      </div>

      <!-- Center section: Quick access links (desktop only) -->
      <div class="d-none d-md-flex align-center ml-4">
        <v-btn to="/admin/dashboard" variant="text" prepend-icon="mdi-view-dashboard">
          Dashboard
        </v-btn>
        <v-btn to="/admin/products" variant="text" prepend-icon="mdi-package-variant">
          Products
        </v-btn>
        <v-btn to="/admin/orders" variant="text" prepend-icon="mdi-clipboard-list"> Orders </v-btn>
        <v-btn to="/admin/users" variant="text" prepend-icon="mdi-account-group"> Users </v-btn>
      </div>

      <!-- Right section: Admin actions -->
      <div class="d-flex align-center">
        <!-- Quick return to main site -->
        <v-btn variant="outlined" color="white" size="small" to="/" class="mr-3 d-none d-sm-flex">
          <v-icon size="small" class="mr-1">mdi-web</v-icon>
          View Site
        </v-btn>

        <!-- Admin profile menu -->
        <v-menu min-width="200">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text" class="px-1">
              <v-avatar color="primary" size="36" class="mr-2">
                <span class="text-h6" v-if="!authStore.user?.avatar">
                  {{ userInitials }}
                </span>
                <v-img v-else :src="authStore.user?.avatar" alt="Admin Avatar"></v-img>
              </v-avatar>
              <span class="d-none d-sm-flex">{{ authStore.user?.firstName }}</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="text-subtitle-1 font-weight-bold">
                {{ authStore.userFullName }}
              </v-list-item-title>
              <v-list-item-subtitle>Administrator</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item to="/profile">
              <template v-slot:prepend>
                <v-icon>mdi-account-cog</v-icon>
              </template>
              Account Settings
            </v-list-item>
            <v-list-item @click="authStore.logout">
              <template v-slot:prepend>
                <v-icon>mdi-logout</v-icon>
              </template>
              Logout
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const emit = defineEmits(['toggle-drawer']);

const userInitials = computed(() => {
  if (!authStore.user) return '';
  return `${authStore.user.firstName[0]}${authStore.user.lastName[0]}`;
});

function toggleDrawer() {
  emit('toggle-drawer');
}
</script>

<style scoped>
/* Add specific styling if needed */
.v-app-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
