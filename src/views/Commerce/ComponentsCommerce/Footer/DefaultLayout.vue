<template>
  <v-main>
    <slot></slot>
    <FooterView v-if="!isHomePage" />
  </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import FooterView from '@/views/Commerce/ComponentsCommerce/Footer/View/FooterView.vue';

const route = useRoute();
const isHomePage = computed(() => route.name === 'home');
</script>

<style scoped>
.v-main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
