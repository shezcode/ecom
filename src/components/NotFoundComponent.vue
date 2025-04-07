<template>
  <v-container class="not-found-container text-center">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="my-6 pa-6">
          <v-card-item>
            <v-icon color="error" size="x-large" class="mb-4"> mdi-alert-circle-outline </v-icon>
            <v-card-title class="text-h3 mb-4"> Oops! Page Not Found </v-card-title>
            <v-card-text class="text-body-1 mb-4">
              We couldn't find the page you were looking for. The page might have been removed,
              renamed, or is temporarily unavailable.
            </v-card-text>
            <v-divider class="my-4"></v-divider>
            <v-card-actions class="justify-center">
              <v-btn color="primary" size="large" variant="elevated" to="/" prepend-icon="mdi-home">
                Return to Home Page
              </v-btn>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.not-found-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
