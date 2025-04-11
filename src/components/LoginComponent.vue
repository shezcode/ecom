<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import type { LoginCredentials } from '@/types/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = ref<LoginCredentials>({
  username: '',
  password: '',
});

const rules = {
  username: [(v: string) => !!v || 'Username is required'],
  password: [(v: string) => !!v || 'Password is required'],
};

const showPassword = ref(false);
const valid = ref(false);

const login = async () => {
  if (!valid.value) return;

  await authStore.login(form.value);

  if (!authStore.error) {
    // Redirect handled in authStore login action
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="mx-auto pa-5" elevation="8">
          <v-card-title class="text-center text-h4 mb-4">Sign In</v-card-title>

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

          <v-form v-model="valid" @submit.prevent="login">
            <v-text-field
              v-model="form.username"
              :rules="rules.username"
              label="Username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              class="mb-4"
              required
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
              Sign In
            </v-btn>

            <div class="text-center">
              <v-btn variant="text" @click="goToRegister" class="highlight">
                Don't have an account? Register here
              </v-btn>
            </div>

            <v-divider class="my-4"></v-divider>

            <div class="text-center text-caption text-grey">
              <p class="mb-0">Demo accounts:</p>
              <p class="mb-0">Username: john / Password: john123</p>
              <p>Username: admin / Password: admin123</p>
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

.highlight {
  text-decoration: underline;
  text-underline-offset: 3px;
  font-style: italic;
}
</style>
