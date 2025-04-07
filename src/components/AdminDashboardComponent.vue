<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-6">Admin Dashboard</h1>
        </v-col>
      </v-row>

      <!-- Stats Cards -->
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="primary" theme="dark">
            <v-card-text>
              <div class="text-overline mb-1">Total Revenue</div>
              <div class="text-h4 mb-2">${{ totalRevenue.toLocaleString() }}</div>
              <v-icon icon="mdi-currency-usd" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="success" theme="dark">
            <v-card-text>
              <div class="text-overline mb-1">Orders</div>
              <div class="text-h4 mb-2">{{ totalOrders }}</div>
              <v-icon icon="mdi-cart-outline" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="info" theme="dark">
            <v-card-text>
              <div class="text-overline mb-1">Products</div>
              <div class="text-h4 mb-2">{{ productStore.products.length }}</div>
              <v-icon icon="mdi-package-variant-closed" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="warning" theme="dark">
            <v-card-text>
              <div class="text-overline mb-1">Users</div>
              <div class="text-h4 mb-2">{{ userCount }}</div>
              <v-icon icon="mdi-account-group" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Charts -->
      <v-row class="mt-6">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h6">
              Monthly Revenue
              <v-spacer></v-spacer>
              <v-btn icon variant="text" @click="refreshData" :loading="loading">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <canvas ref="revenueChart" height="300"></canvas>
            </v-card-text>
          </v-card> </v-col></v-row
    ></v-container>
  </div>
</template>
