<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const valid = ref(false);

// Form validation rules
const rules = {
  username: [
    (v: string) => !!v || 'Username is required',
    (v: string) => v.length >= 3 || 'Username must be at least 3 characters',
  ],
  email: [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ],
  password: [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
  ],
  confirmPassword: [
    (v: string) => !!v || 'Please confirm your password',
    (v: string) => v === form.value.password || 'Passwords do not match',
  ],
  firstName: [(v: string) => !!v || 'First name is required'],
  lastName: [(v: string) => !!v || 'Last name is required'],
};

const register = async () => {
  if (!valid.value) return;

  // Call the register action from auth store
  await authStore.register({
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    role: 'user',
    avatar: 'https://via.placeholder.com/150',
  });

  if (!authStore.error) {
    router.push('/login');
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="mx-auto pa-5" elevation="8">
          <v-card-title class="text-center text-h4 mb-4">Sign Up</v-card-title>

          <v-alert
            v-if="authStore.error"
            type="error"
            variant="tonal"
            density="compact"
            closable
            class="mb-4"
          >
            {{ authStore.error }}
          </v-alert>

          <v-form v-model="valid" @submit.prevent="register">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.firstName"
                  :rules="rules.firstName"
                  label="First Name"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.lastName"
                  :rules="rules.lastName"
                  label="Last Name"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="form.username"
              :rules="rules.username"
              label="Username"
              prepend-inner-icon="mdi-account-circle"
              variant="outlined"
              class="mb-4"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              label="Email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              class="mb-4"
              required
              type="email"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              class="mb-4"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.confirmPassword"
              :rules="rules.confirmPassword"
              label="Confirm Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-check"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              variant="outlined"
              class="mb-6"
              required
            ></v-text-field>

            <v-btn
              :loading="authStore.loading"
              color="primary"
              block
              size="large"
              type="submit"
              :disabled="!valid"
              class="mb-4"
            >
              Create Account
            </v-btn>

            <div class="text-center">
              <v-btn variant="text" @click="goToLogin">
                Already have an account? Sign in here
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 80vh;
  display: flex;
  align-items: center;
}
</style>
