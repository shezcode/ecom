<template>
  <v-footer color="primary" dark class="footer">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <h3 class="text-h6 mb-2">ECOM</h3>
          <p class="text-caption">
            Your one-stop shop for all your shopping needs. Quality products at affordable prices.
          </p>
          <div class="mt-4">
            <v-btn icon variant="text" color="white" class="me-2">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" class="me-2">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white" class="me-2">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="white">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="6" md="2" class="text-center text-md-left">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Navigation</h4>
          <v-list density="compact" bg-color="transparent" color="white">
            <v-list-item to="/" title="Home" density="compact"></v-list-item>
            <v-list-item to="/products" title="Products" density="compact"></v-list-item>
            <v-list-item to="/categories" title="Categories" density="compact"></v-list-item>
            <v-list-item to="/about" title="About Us" density="compact"></v-list-item>
          </v-list>
        </v-col>

        <v-col cols="6" md="2" class="text-center text-md-left">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Categories</h4>
          <v-list density="compact" bg-color="transparent" color="white">
            <v-list-item to="/categories" title="Clothing" density="compact"></v-list-item>
            <v-list-item to="/categories" title="Electronics" density="compact"></v-list-item>
            <v-list-item to="/categories" title="Books" density="compact"></v-list-item>
            <v-list-item to="/categories" title="Home" density="compact"></v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="3" class="text-center text-md-left">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Contact Us</h4>
          <div class="d-flex align-center mb-2">
            <v-icon size="small" class="me-2">mdi-map-marker</v-icon>
            <span class="text-caption">123 E-Commerce St, Shopping City</span>
          </div>
          <div class="d-flex align-center mb-2">
            <v-icon size="small" class="me-2">mdi-phone</v-icon>
            <span class="text-caption">+1 (123) 456-7890</span>
          </div>
          <div class="d-flex align-center">
            <v-icon size="small" class="me-2">mdi-email</v-icon>
            <span class="text-caption">info@ecommerceapp.com</span>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" color="white"></v-divider>

      <div class="text-center">
        <span class="text-caption">
          &copy; {{ new Date().getFullYear() }} ECOM. All rights reserved.
        </span>
      </div>
    </v-container>
  </v-footer>
</template>

<style>
.footer {
  position: relative;
  margin-top: 2rem;
  background: linear-gradient(to bottom, rgba(65, 90, 119, 0.9), rgba(13, 27, 42, 1)) !important;
}
</style>
