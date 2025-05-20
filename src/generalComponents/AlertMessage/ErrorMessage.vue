<template>
  <div class="alert-container">
    <v-card class="alert-card error-card">
      <div class="icon-container">
        <v-icon
          size="80"
          color="error"
        >
          mdi-emoticon-sad-outline
        </v-icon>
      </div>
      <div class="alert-title error-title">Error!</div>
      <p class="alert-message">
        Algo salió mal.
      </p>
      <v-btn
        color="error"
        variant="tonal"
        class="alert-button"
        @click="retry"
        block
      >
        Intente Otra vez
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const retry = () => {
  router.push({ name: "home" });
};
</script>

<style scoped>
.alert-container {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}

.alert-card {
  width: 256px;
  height: 320px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.alert-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.error-title {
  color: #d32f2f;
}

.alert-message {
  text-align: center;
  color: #666;
  margin: 0.5rem 0;
}

.alert-button {
  margin-top: 1rem;
}
</style>
  