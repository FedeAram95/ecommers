<template>
  <div class="loader-container">
    <div class="loader-box">
      <div class="ohnolore">OHNOLORE</div>
      <div class="location-box">ESTILO CAMPO - SALSIPUEDES</div>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 800px; /* <-- más ancho */
  padding: 2.5rem;
  border-radius: 24px;
  background-color: #fefefe;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  animation: floatLoader 3s ease-in-out infinite;
}

.loader-box {
  background: linear-gradient(to right, #8b5e3c, #a47148); /* Madera */
  border-radius: 16px;
  padding: 2rem; /* <-- más espacio interno */
  width: 100%;
  text-align: center;
  color: white;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
}

.ohnolore {
  font-size: 2.2rem;
  font-weight: 900;
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 6px;
  margin-bottom: 1.5rem;
  animation: floatText 3s ease-in-out infinite;
}

.location-box {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: white;
  color: #444;
  font-weight: 600;
  border-radius: 12px;
  font-size: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
}

@keyframes floatLoader {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

@keyframes floatText {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
