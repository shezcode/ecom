<template>
  <v-app-bar color="primary" app dark>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-app-bar-title>
      <router-link to="/" class="text-white text-decoration-none">ECOM</router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Search -->
    <v-text-field
      v-model="searchQuery"
      density="compact"
      variant="solo"
      prepend-inner-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      @keyup.enter="search"
      class="hidden-sm-and-down"
      style="max-width: 300px"
    ></v-text-field>

    <v-spacer></v-spacer>

    <!-- Desktop Menu -->
    <div class="hidden-sm-and-down">
      <v-btn to="/" variant="text">Home</v-btn>
      <v-btn to="/products" variant="text">Products</v-btn>
      <v-btn to="/categories" variant="text">Categories</v-btn>
      <v-btn v-if="authStore.isAuthenticated" to="/cart" variant="text">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </div>

    <!-- User Menu -->
    <v-menu v-if="authStore.isAuthenticated" min-width="200">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-avatar color="accent" size="32">
            <span class="text-h6" v-if="!authStore.user?.avatar">
              {{ userInitials }}
            </span>
            <v-img v-else :src="authStore.user?.avatar" alt="User Avatar"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-subtitle-1 font-weight-bold">
            {{ authStore.userFullName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ authStore.user?.email }}</v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/profile">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          Profile
        </v-list-item>
        <v-list-item v-if="authStore.isAdmin" to="/admin/dashboard">
          <template v-slot:prepend>
            <v-icon>mdi-view-dashboard</v-icon>
          </template>
          Admin Dashboard
        </v-list-item>
        <v-list-item @click="authStore.logout">
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          Logout
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn v-else to="/login" variant="outlined" color="white"> Sign In </v-btn>
  </v-app-bar>

  <!-- Navigation Drawer for Mobile -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item title="ECOM" prepend-icon="mdi-store"></v-list-item>
      <v-divider></v-divider>
      <v-list-item to="/" title="Home" prepend-icon="mdi-home"></v-list-item>
      <v-list-item to="/products" title="Products" prepend-icon="mdi-tag-multiple"></v-list-item>
      <v-list-item to="/categories" title="Categories" prepend-icon="mdi-shape"></v-list-item>
      <v-list-item to="/about" title="About" prepend-icon="mdi-information"></v-list-item>

      <v-divider></v-divider>

      <template v-if="authStore.isAuthenticated">
        <v-list-item to="/profile" title="Profile" prepend-icon="mdi-account"></v-list-item>
        <v-list-item to="/cart" title="Cart" prepend-icon="mdi-cart"></v-list-item>

        <template v-if="authStore.isAdmin">
          <v-divider></v-divider>
          <v-list-subheader>Admin</v-list-subheader>
          <v-list-item
            to="/admin/dashboard"
            title="Dashboard"
            prepend-icon="mdi-view-dashboard"
          ></v-list-item>
          <v-list-item
            to="/admin/products"
            title="Manage Products"
            prepend-icon="mdi-package-variant"
          ></v-list-item>
          <v-list-item
            to="/admin/categories"
            title="Manage Categories"
            prepend-icon="mdi-shape-outline"
          ></v-list-item>
          <v-list-item
            to="/admin/orders"
            title="Manage Orders"
            prepend-icon="mdi-clipboard-list"
          ></v-list-item>
          <v-list-item
            to="/admin/users"
            title="Manage Users"
            prepend-icon="mdi-account-multiple"
          ></v-list-item>
        </template>

        <v-divider></v-divider>
        <v-list-item
          @click="authStore.logout"
          title="Logout"
          prepend-icon="mdi-logout"
        ></v-list-item>
      </template>
      <template v-else>
        <v-list-item to="/login" title="Sign In" prepend-icon="mdi-login"></v-list-item>
        <v-list-item to="/register" title="Register" prepend-icon="mdi-account-plus"></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const drawer = ref(false);
const searchQuery = ref('');
const router = useRouter();
const authStore = useAuthStore();

const userInitials = computed(() => {
  if (!authStore.user) return '';
  return `${authStore.user.firstName[0]}${authStore.user.lastName[0]}`;
});

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value },
    });
    searchQuery.value = '';
  }
};
</script>
