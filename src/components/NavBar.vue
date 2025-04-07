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
  <div class="custom-shape-divider-top-1744014189">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        class="shape-fill"
      ></path>
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        class="shape-fill"
      ></path>
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        class="shape-fill"
      ></path>
    </svg>
  </div>
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

<style>
.custom-shape-divider-top-1744014189 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1744014189 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 169px;
}

.custom-shape-divider-top-1744014189 .shape-fill {
  fill: #415a77;
}
</style>
