<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import api from '@/services/api';
import type { SalesData } from '@/types/sales';
import Chart from 'chart.js/auto';

const productStore = useProductStore();
const salesData = ref<SalesData[]>([]);
const loading = ref(false);
const totalRevenue = ref(0);
const totalOrders = ref(0);
const userCount = ref(0);
let revenueChart: Chart | null = null;

onMounted(async () => {
  loading.value = true;
  await productStore.fetchProducts();
  await fetchSalesData();
  await fetchUserCount();
  renderChart();
  loading.value = false;
});

const fetchSalesData = async () => {
  try {
    const response = await api.get('/sales');
    salesData.value = response.data;
    calculateTotals();
  } catch (error) {
    console.error('Error fetching sales data:', error);
  }
};

const fetchUserCount = async () => {
  try {
    const response = await api.get('/users');
    userCount.value = response.data.length;
  } catch (error) {
    console.error('Error fetching user count:', error);
  }
};

const calculateTotals = () => {
  totalRevenue.value = salesData.value.reduce((sum, item) => sum + item.revenue, 0);
  totalOrders.value = salesData.value.reduce((sum, item) => sum + item.orders, 0);
};

const renderChart = () => {
  const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
  if (!ctx) return;

  if (revenueChart) {
    revenueChart.destroy();
  }

  revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: salesData.value.map((item) => item.month),
      datasets: [
        {
          label: 'Monthly Revenue ($)',
          data: salesData.value.map((item) => item.revenue),
          backgroundColor: 'rgba(65, 90, 119, 0.2)',
          borderColor: 'rgba(65, 90, 119, 1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  });
};

const refreshData = async () => {
  loading.value = true;
  await fetchSalesData();
  await fetchUserCount();
  renderChart();
  loading.value = false;
};
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-6 text-white">Admin Dashboard</h1>
        </v-col>
      </v-row>

      <!-- Stats Cards -->
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="primary" theme="dark" elevation="8">
            <v-card-text>
              <div class="text-overline mb-1">Total Revenue</div>
              <div class="text-h4 mb-2">${{ totalRevenue.toLocaleString() }}</div>
              <v-icon icon="mdi-currency-usd" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="success" theme="dark" elevation="8">
            <v-card-text>
              <div class="text-overline mb-1">Orders</div>
              <div class="text-h4 mb-2">{{ totalOrders }}</div>
              <v-icon icon="mdi-cart-outline" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="info" theme="dark" elevation="8">
            <v-card-text>
              <div class="text-overline mb-1">Products</div>
              <div class="text-h4 mb-2">{{ productStore.products.length }}</div>
              <v-icon icon="mdi-package-variant-closed" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto" color="warning" theme="dark" elevation="8">
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
          <v-card elevation="8">
            <v-card-title class="text-h6">
              Monthly Revenue
              <v-spacer></v-spacer>
              <v-btn icon variant="text" @click="refreshData" :loading="loading">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div style="position: relative; height: 300px">
                <canvas id="revenueChart"></canvas>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card elevation="8">
            <v-card-title class="text-h6"> Recent Orders </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  prepend-icon="mdi-cart"
                  title="Order #1001"
                  subtitle="Completed - $149.97"
                >
                </v-list-item>
                <v-list-item
                  prepend-icon="mdi-cart"
                  title="Order #1002"
                  subtitle="Completed - $999.99"
                >
                </v-list-item>
                <v-list-item
                  prepend-icon="mdi-cart"
                  title="Order #1003"
                  subtitle="Completed - $85.97"
                >
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn text to="/admin/orders">View All Orders</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Quick Actions -->
      <v-row class="mt-6">
        <v-col cols="12">
          <v-card elevation="8">
            <v-card-title class="text-h6">Quick Actions</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-btn block color="primary" to="/admin/products" prepend-icon="mdi-plus">
                    Add Product
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-btn block color="secondary" to="/admin/categories" prepend-icon="mdi-plus">
                    Add Category
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-btn block color="info" to="/admin/orders" prepend-icon="mdi-eye">
                    View Orders
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-btn block color="warning" to="/admin/users" prepend-icon="mdi-account-plus">
                    Add User
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  color: white;
}
</style>
