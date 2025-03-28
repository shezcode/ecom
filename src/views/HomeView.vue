<template>
  <NavBar />
  <HomeComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import HomeComponent from '@/components/HomeComponent.vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    NavBar,
    HomeComponent,
  },
});
</script>
