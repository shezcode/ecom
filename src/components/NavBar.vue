<template>
  <v-app-bar color="primary" app dark>
    <div class="d-flex align-center justify-space-between w-100 px-4">
      <!-- Left side: Logo and menu icon -->
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none mr-2"></v-app-bar-nav-icon>

        <v-app-bar-title>
          <router-link to="/" class="text-white text-decoration-none">ECOM</router-link>
        </v-app-bar-title>
      </div>

      <!-- Center section: Desktop menu -->
      <div class="d-none d-md-flex align-center">
        <v-btn to="/" variant="text">Home</v-btn>
        <v-divider :thickness="2" class="mx-2" vertical></v-divider>
        <v-btn to="/products" variant="text">Products</v-btn>
        <v-divider :thickness="2" class="mx-2" vertical></v-divider>
        <v-btn to="/categories" variant="text">Categories</v-btn>
        <v-divider :thickness="2" class="mx-2" vertical></v-divider>
        <v-btn to="/about" variant="text">About Us</v-btn>
      </div>

      <!-- Right side: Search bar, cart, user menu -->
      <div class="d-flex align-center">
        <!-- Search (Desktop only) -->
        <div class="search-container d-none d-md-block mr-4">
          <v-text-field
            v-model="searchQuery"
            density="default"
            variant="outlined"
            bg-color="rgba(255, 255, 255, 0.1)"
            color="white"
            prepend-inner-icon="mdi-magnify"
            label="Search products..."
            single-line
            hide-details
            @keyup.enter="search"
            class="search-field"
            style="min-width: 300px"
          ></v-text-field>
        </div>

        <!-- Mobile search icon -->
        <v-btn icon variant="text" class="d-md-none mr-2" @click="mobileSearch = !mobileSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- Cart Icon -->
        <v-btn
          v-if="authStore.isAuthenticated"
          to="/cart"
          variant="text"
          class="position-relative ml-2"
        >
          <v-icon>mdi-cart</v-icon>
          <v-badge
            v-if="cartStore.totalItems > 0"
            :content="cartStore.totalItems"
            color="error"
            floating
            dot-color="error"
          ></v-badge>
        </v-btn>

        <!-- User Menu -->
        <v-menu v-if="authStore.isAuthenticated" min-width="200" class="ml-2">
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

        <v-btn v-else to="/login" variant="outlined" color="white" class="ml-2"> Sign In </v-btn>
      </div>
    </div>
  </v-app-bar>

  <!-- Mobile search bar -->
  <v-expand-transition>
    <div v-if="mobileSearch" class="mobile-search-bar">
      <v-container>
        <v-text-field
          v-model="searchQuery"
          density="default"
          variant="outlined"
          bg-color="white"
          color="primary"
          prepend-inner-icon="mdi-magnify"
          append-inner-icon="mdi-close"
          @click:append-inner="mobileSearch = false"
          label="Search products..."
          single-line
          hide-details
          @keyup.enter="searchMobile"
          class="mobile-search-field"
          autofocus
        ></v-text-field>
      </v-container>
    </div>
  </v-expand-transition>

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
        <v-list-item to="/cart" title="Cart" prepend-icon="mdi-cart">
          <template v-slot:append v-if="cartStore.totalItems > 0">
            <v-chip color="error" size="small" class="ml-2">{{ cartStore.totalItems }}</v-chip>
          </template>
        </v-list-item>

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
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

const drawer = ref(false);
const searchQuery = ref('');
const mobileSearch = ref(false);
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();

onMounted(() => {
  if (route.path === '/products' && route.query.search) {
    searchQuery.value = route.query.search as string;
  }
});

watch(
  () => route.query.search,
  (newQuery) => {
    if (route.path === '/products') {
      searchQuery.value = (newQuery as string) || '';
    }
  },
);

const userInitials = computed(() => {
  if (!authStore.user) return '';
  return `${authStore.user.firstName[0]}${authStore.user.lastName[0]}`;
});

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() },
    });
  }
};

const searchMobile = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() },
    });
    mobileSearch.value = false;
  }
};
</script>

<style scoped>
.mobile-search-bar {
  position: absolute;
  top: 56px; /* Height of the app bar */
  left: 0;
  right: 0;
  background-color: var(--v-primary-base);
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
}

/* Adjust input sizes for better text visibility */
:deep(.v-field__input) {
  font-size: 16px !important;
  min-height: 40px !important;
}

@media (min-width: 960px) {
  .mobile-search-bar {
    display: none;
  }
}
</style>
