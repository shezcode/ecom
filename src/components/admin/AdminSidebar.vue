<template>
  <div class="admin-sidebar">
    <!-- Admin Header -->
    <div class="admin-sidebar-header pa-4">
      <v-avatar color="primary" size="48" class="mb-2">
        <v-icon size="large" color="white">mdi-shield-account</v-icon>
      </v-avatar>
      <h2 class="text-h6 font-weight-bold mb-1">Admin Panel</h2>
      <div class="text-caption text-secondary">Manage your store</div>
    </div>

    <v-divider></v-divider>

    <!-- Navigation Section -->
    <v-list nav density="comfortable">
      <v-list-subheader>MAIN NAVIGATION</v-list-subheader>

      <v-list-item
        to="/admin/dashboard"
        :active="isCurrentRoute('/admin/dashboard')"
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        rounded="lg"
      >
        <template v-slot:append>
          <v-chip size="x-small" color="info" v-if="hasNewNotifications">
            {{ notificationCount }}
          </v-chip>
        </template>
      </v-list-item>

      <!-- Content Management Section -->
      <v-list-subheader>STORE MANAGEMENT</v-list-subheader>

      <v-list-item
        to="/admin/products"
        :active="isCurrentRoute('/admin/products')"
        prepend-icon="mdi-package-variant"
        title="Products"
        rounded="lg"
      ></v-list-item>

      <v-list-item
        to="/admin/categories"
        :active="isCurrentRoute('/admin/categories')"
        prepend-icon="mdi-shape-outline"
        title="Categories"
        rounded="lg"
      ></v-list-item>

      <v-list-item
        to="/admin/orders"
        :active="isCurrentRoute('/admin/orders')"
        prepend-icon="mdi-clipboard-list"
        title="Orders"
        rounded="lg"
      >
        <template v-slot:append>
          <v-chip size="x-small" color="warning" v-if="hasPendingOrders">
            {{ pendingOrdersCount }}
          </v-chip>
        </template>
      </v-list-item>

      <!-- User Management Section -->
      <v-list-subheader>USER MANAGEMENT</v-list-subheader>

      <v-list-item
        to="/admin/users"
        :active="isCurrentRoute('/admin/users')"
        prepend-icon="mdi-account-multiple"
        title="Users"
        rounded="lg"
      ></v-list-item>

      <!-- System Section -->
      <v-list-subheader>SYSTEM</v-list-subheader>

      <v-list-item
        to="/admin/settings"
        :active="isCurrentRoute('/admin/settings')"
        prepend-icon="mdi-cog"
        title="Settings"
        rounded="lg"
      ></v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item to="/" prepend-icon="mdi-web" title="View Site" rounded="lg"></v-list-item>

      <v-list-item
        @click="confirmLogout"
        prepend-icon="mdi-logout"
        title="Logout"
        rounded="lg"
      ></v-list-item>
    </v-list>

    <!-- System Status -->
    <div class="system-status pa-4 mt-auto">
      <div class="d-flex align-center justify-space-between">
        <div class="text-caption">System Status</div>
        <v-chip size="x-small" color="success">Online</v-chip>
      </div>
      <div class="text-caption text-grey mt-2">Last updated: 10 minutes ago</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const route = useRoute();
const authStore = useAuthStore();

// Sample notification data (in a real app, this would come from a store)
const notificationCount = 3;
const hasNewNotifications = computed(() => notificationCount > 0);

const pendingOrdersCount = 2;
const hasPendingOrders = computed(() => pendingOrdersCount > 0);

function isCurrentRoute(path: string): boolean {
  return route.path === path;
}

function confirmLogout() {
  if (confirm('Are you sure you want to logout?')) {
    authStore.logout();
  }
}
</script>

<style scoped>
.admin-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.admin-sidebar-header {
  text-align: center;
}

.system-status {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: auto;
}

/* Active item styling */
:deep(.v-list-item--active) {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

:deep(.v-list-item--active .v-list-item-title) {
  font-weight: 600;
}
</style>
