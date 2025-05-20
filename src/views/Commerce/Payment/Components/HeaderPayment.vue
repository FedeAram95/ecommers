<template>
  <v-app-bar
    class="payment-header"
    fixed
    color="#3A5199"
    elevation="2"
  >
    <v-container class="header-container">
      <v-img
        :src="logo"
        alt="Logo"
        class="header-logo"
        @click="goHome"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logoImage from "@/assets/logo.png";

const router = useRouter();
const logo = ref(logoImage);

const goHome = () => {
  router.push({ name: 'home' });
};
</script>

<style scoped>
.payment-header {
  height: 56px;
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.header-logo {
  height: 64px;
  width: auto;
  padding: 0 0.5rem;
  cursor: pointer;
}
</style>