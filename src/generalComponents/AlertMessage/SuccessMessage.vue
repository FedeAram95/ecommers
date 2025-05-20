<template>
  <div class="alert-container">
    <v-card class="alert-card success-card">
      <div class="icon-container">
        <v-icon
          size="80"
          color="success"
        >
          mdi-emoticon-happy-outline
        </v-icon>
      </div>
      <div class="alert-title success-title">Éxito!</div>
      <p class="alert-message">
        Su solicitud se procesó con éxito!
      </p>
      <v-btn
        color="success"
        variant="tonal"
        class="alert-button"
        @click="proceed"
        block
      >
        Continuar
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const proceed = () => {
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

.success-title {
  color: #2e7d32;
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
