<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Sección de contacto compacta -->
      <div class="contact-section">
        <div class="contact-item">
          <img src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-01-512.png" alt="Teléfono" class="contact-icon" />
          <span class="contact-text">+1 234 567 890</span>
        </div>
        <div class="contact-item">
          <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" alt="Ubicación" class="contact-icon" />
          <span class="contact-text">Calle Teclab 123, Argentina</span>
        </div>
        <div class="contact-item">
          <img src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/clock-time-ticker-times-hour-512.png" alt="Horario" class="contact-icon" />
          <span class="contact-text">Lunes a Viernes - 09:00 a 17:00</span>
        </div>
      </div>

      <!-- Redes sociales horizontales -->
      <div class="social-links">
        <a href="https://www.facebook.com/teclabinstituto" target="_blank" rel="noopener noreferrer">
          <v-icon class="social-icon" size="24">mdi-facebook</v-icon>
        </a>
        <a href="https://x.com/teclabinstituto" target="_blank" rel="noopener noreferrer">
          <v-icon class="social-icon" size="24">mdi-twitter</v-icon>
        </a>
        <a href="https://www.instagram.com/teclabinstituto/?hl=es" target="_blank" rel="noopener noreferrer">
          <v-icon class="social-icon" size="24">mdi-instagram</v-icon>
        </a>
        <a href="https://ar.linkedin.com/school/teclabinstituto/" target="_blank" rel="noopener noreferrer">
          <v-icon class="social-icon" size="24">mdi-linkedin</v-icon>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #e4d3b8;
  color: #111;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e4d3b8;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-icon {
  width: 18px;
  height: 18px;
  filter: invert(0.1);
}

.contact-text {
  font-weight: 500;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-icon {
  color: #111;
  transition: opacity 0.3s;
}

.social-icon:hover {
  opacity: 0.7;
}
</style>
