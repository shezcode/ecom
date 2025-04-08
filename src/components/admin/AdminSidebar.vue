<template>
  <v-list>
    <v-list-item title="Admin Panel" prepend-icon="mdi-view-dashboard" class="mb-2"> </v-list-item>
    <v-divider></v-divider>
    <v-list-item
      to="/admin/dashboard"
      title="Dashboard"
      prepend-icon="mdi-view-dashboard"
    ></v-list-item>
    <v-list-item
      to="/admin/products"
      title="Products"
      prepend-icon="mdi-package-variant"
    ></v-list-item>
    <v-list-item
      to="/admin/categories"
      title="Categories"
      prepend-icon="mdi-shape-outline"
    ></v-list-item>
    <v-list-item to="/admin/orders" title="Orders" prepend-icon="mdi-clipboard-list"></v-list-item>
    <v-list-item to="/admin/users" title="Users" prepend-icon="mdi-account-multiple"></v-list-item>
    <v-divider class="my-2"></v-divider>
    <v-list-item to="/" title="Back to Site" prepend-icon="mdi-arrow-left"></v-list-item>
  </v-list>
</template>
