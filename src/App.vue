<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.v-application {
  background-color: #ffffff !important;
}

/* Eliminar márgenes por defecto de Vuetify */
.v-container {
  padding: 0 !important;
  margin: 0 !important;
  max-width: none !important;
}

.v-main {
  padding: 0 !important;
}
</style>
