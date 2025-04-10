<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';

// Stores
const categoryStore = useCategoryStore();

// State
const carousel = ref(0);
const reviews = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/50/50',
    rating: 5,
    date: '2025-03-15',
    comment:
      'The quality of the products exceeded my expectations! Fast shipping and excellent customer service.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: '/api/placeholder/50/50',
    rating: 4,
    date: '2025-03-02',
    comment:
      'Great selection of products. I particularly enjoyed the electronics category. Will shop again!',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    avatar: '/api/placeholder/50/50',
    rating: 5,
    date: '2025-02-18',
    comment:
      'The home goods I purchased transformed my living space. The customer support team was also very helpful.',
  },
]);

// Company Info
const companyInfo = {
  name: 'ECOM',
  slogan: 'Quality products for everyday life',
  founded: '2023',
  mission:
    'To provide high-quality products at affordable prices while ensuring exceptional customer experience.',
};

// Fetch data
onMounted(() => {
  categoryStore.fetchCategories();
});

// Methods
const getCategoryColor = (index: number) => {
  const colors = ['primary', 'secondary', 'info', 'success'];
  return colors[index % colors.length];
};
</script>

<template>
  <div class="home-container">
    <!-- Hero Carousel -->
    <v-carousel
      v-model="carousel"
      cycle
      height="500"
      hide-delimiter-background
      show-arrows="hover"
      interval="5000"
    >
      <!-- Slogan Slide -->
      <v-carousel-item>
        <v-sheet height="100%" class="d-flex align-center justify-center" color="primary">
          <div class="text-center pa-4 carousel-content">
            <h1 class="text-h2 font-weight-bold text-white mb-4">{{ companyInfo.slogan }}</h1>
            <p class="text-h6 font-weight-regular text-white mb-6">
              Discover exceptional products for your everyday needs
            </p>
            <v-btn size="large" color="white" variant="elevated" to="/products">
              Shop Now
              <v-icon end icon="mdi-arrow-right"></v-icon>
            </v-btn>
          </div>
        </v-sheet>
      </v-carousel-item>

      <!-- Category Slides -->
      <v-carousel-item v-for="(category, index) in categoryStore.categories" :key="category.id">
        <v-sheet height="100%" :color="getCategoryColor(index)" class="d-flex align-center">
          <v-container class="carousel-content">
            <v-row>
              <v-col cols="12" md="7" class="d-flex flex-column justify-center">
                <div class="pa-4">
                  <h2 class="text-h3 font-weight-bold text-white mb-2">{{ category.name }}</h2>
                  <p class="text-h6 text-white mb-4">{{ category.description }}</p>
                  <v-btn
                    color="white"
                    variant="elevated"
                    size="large"
                    :to="`/products?categoryId=${category.id}`"
                  >
                    Shop {{ category.name }}
                    <v-icon end>{{ category.icon }}</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="5" class="d-flex align-center justify-center">
                <v-icon
                  :icon="category.icon"
                  size="x-large"
                  color="white"
                  class="category-icon"
                ></v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!-- Featured Products -->
    <v-container class="mt-12 mb-12">
      <h2 class="text-h4 text-center mb-8 font-weight-bold text-white">Featured Products</h2>
      <v-row v-if="categoryStore.loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          <div class="mt-4 text-white">Loading categories...</div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <v-btn
            size="large"
            color="white"
            variant="elevated"
            class="mx-2"
            to="/products"
            prepend-icon="mdi-shopping"
          >
            Browse All Products
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- About Us Section -->
    <v-sheet class="py-12 bg-transparent">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="text-h4 font-weight-bold mb-4 text-white">About {{ companyInfo.name }}</h2>
            <v-divider class="mb-4"></v-divider>
            <p class="text-body-1 mb-4 text-white">
              Founded in {{ companyInfo.founded }}, {{ companyInfo.name }} has been committed to
              delivering quality products that enhance your everyday life.
            </p>
            <p class="text-body-1 mb-4 text-white">
              {{ companyInfo.mission }}
            </p>
            <p class="text-body-1 mb-6 text-white">
              We work directly with manufacturers to bring you the best prices without compromising
              on quality. Our team carefully selects each product to ensure it meets our high
              standards.
            </p>
            <v-btn color="white" variant="elevated" to="/about">
              Learn More About Us
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-img
              src="/api/placeholder/500/300"
              max-width="500"
              alt="About us image"
              class="rounded-lg"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Customer Reviews -->
    <v-container class="py-12">
      <h2 class="text-h4 text-center mb-8 font-weight-bold text-white">What Our Customers Say</h2>
      <v-row>
        <v-col v-for="review in reviews" :key="review.id" cols="12" md="4">
          <v-card class="mx-auto h-100 review-card" variant="elevated">
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar size="40">
                  <v-img :src="review.avatar" :alt="`${review.name}'s avatar`"></v-img>
                </v-avatar>
              </template>
              <v-card-title>{{ review.name }}</v-card-title>
              <template v-slot:append>
                <div class="d-flex">
                  <v-icon
                    v-for="n in 5"
                    :key="n"
                    :color="n <= review.rating ? 'amber' : 'grey-lighten-1'"
                    icon="mdi-star"
                    size="small"
                  ></v-icon>
                </div>
              </template>
            </v-card-item>
            <v-card-text>
              <p class="text-body-1">{{ review.comment }}</p>
              <div class="text-caption text-grey mt-2">{{ review.date }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center mt-8">
        <v-btn color="white" variant="outlined" size="large"> View All Reviews </v-btn>
      </div>
    </v-container>

    <!-- Call to Action -->
    <v-sheet color="primary" class="py-12">
      <v-container>
        <div class="text-center">
          <h2 class="text-h4 font-weight-bold text-white mb-4">Ready to start shopping?</h2>
          <p class="text-h6 text-white mb-6">
            Join thousands of satisfied customers and discover our quality products today.
          </p>
          <v-btn color="white" variant="elevated" size="large" to="/products">
            Shop Now
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-sheet>
  </div>
</template>

<style scoped>
.category-icon {
  font-size: 120px;
}

.carousel-content {
  max-width: 80%;
  margin: 0 auto;
  padding: 0 40px;
}

.home-container {
  color: white;
}

.review-card {
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}

@media (max-width: 600px) {
  .category-icon {
    font-size: 80px;
  }

  .carousel-content {
    max-width: 90%;
    padding: 0 24px;
  }
}
</style>
