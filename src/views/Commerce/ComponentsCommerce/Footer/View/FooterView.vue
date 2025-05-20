<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <a @click="navigateToAboutUs" class="about-link">Acerca de Nosotros</a>
      </div>
      <div class="contact-section">
        <div class="contact-item">
          <img src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-01-512.png" alt="Teléfono" class="contact-icon" />
          <p><span class="contact-text">+1 234 567 890</span></p>
        </div>
        <div class="contact-item">
          <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" alt="Ubicación" class="contact-icon" />
          <p><span class="contact-text">Calle Teclab 123, Argentina</span></p>
        </div>
        <div class="contact-item">
          <img src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/clock-time-ticker-times-hour-512.png" alt="Horario" class="contact-icon" />
          <p><span class="contact-text">Lunes a Viernes - 09:00Hrs a 17:00Hrs</span></p>
        </div>
        <p @click="navigateToSupport" class="support-link">Quiero preguntar</p>
      </div>
      <div class="social-section">
        <p class="social-title">Seguinos!</p>
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
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToAboutUs = () => {
  router.push({ name: "AboutUs" })
}

const navigateToSupport = () => {
  router.push({ name: "Support" })
}
</script>

<style scoped>
.footer {
  background-color: #242424;
  color: white;
  padding: 24px 32px;
  border-top: 4px solid #f97316;
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
  }
}

.footer-section {
  margin-left: 32px;
}

.about-link {
  font-weight: 700;
  padding-left: 80px;
  cursor: pointer;
  font-size: 1.25rem;
  text-decoration: underline;
  transition: color 0.3s;
}

.about-link:hover {
  color: #93c5fd;
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  height: 20px;
  width: 20px;
  filter: invert(1);
}

.contact-text {
  font-weight: 600;
}

.support-link {
  cursor: pointer;
  font-weight: 700;
  color: #fb923c;
  margin-top: 20px;
  transition: color 0.3s;
}

.support-link:hover {
  color: #fed7aa;
}

.social-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-title {
  font-weight: 700;
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-icon {
  color: white;
  transition: opacity 0.3s;
}

.social-icon:hover {
  opacity: 0.8;
}
</style>
