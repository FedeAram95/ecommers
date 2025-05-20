<template>
  <DefaultLayout>
    <v-container class="about-us">
      <v-app-bar
        color="grey-lighten-3"
        flat
        class="about-header"
      >
        <v-img
          :src="logo"
          alt="Teclab Commerce Logo"
          class="header-logo"
          @click="navigateToHome"
        />
        <v-spacer />
        <h1 class="about-title">
          Sobre Nosotros
        </h1>
        <v-spacer />
      </v-app-bar>

      <v-row class="about-content">
        <v-col cols="12" md="4" class="team-image">
          <v-img
            src="https://ceroideas.es/wp-content/uploads/2018/11/que-hace-un-programador.jpg"
            alt="Equipo"
            class="team-photo"
            cover
          />
        </v-col>
        <v-col cols="12" md="8" class="about-text">
          <p class="text-justify">
            Bienvenido a Teclab Commerce, tu destino en línea para una amplia
            gama de productos, incluyendo electrodomésticos, vehículos y
            tecnología. Nos enorgullece ofrecerte una experiencia de compra
            excepcional, con productos de alta calidad y precios competitivos
            que satisfacen tus necesidades diarias.
          </p>
          <p class="text-justify">
            Desde nuestros inicios, nuestro compromiso ha sido contigo, nuestro
            cliente. Creemos en la importancia de la satisfacción del cliente,
            la sostenibilidad y la innovación. Por eso, cada artículo que
            ofrecemos es cuidadosamente seleccionado para garantizar la mejor
            calidad.
          </p>
          <p class="text-justify">
            Nuestro equipo está formado por apasionados de la tecnología y el
            comercio, que trabajan incansablemente para traerte las últimas
            tendencias y los mejores productos disponibles en el mercado.
            Además, estamos emocionados por el futuro, ya que planeamos expandir
            nuestra oferta para incluir una variedad aún mayor de productos,
            adaptándonos siempre a tus necesidades.
          </p>
          <p class="text-justify">
            ¡Gracias por elegir Teclab Commerce! Esperamos que disfrutes
            explorando nuestra tienda y encuentres exactamente lo que buscas.
          </p>
        </v-col>
      </v-row>

      <v-divider class="team-divider" />

      <v-container class="team-section">
        <h3 class="team-section-title">
          Equipo Involucrado
        </h3>
        <v-row class="team-grid">
          <v-col cols="12" md="4">
            <v-card class="team-card">
              <v-card-title class="team-role">Frontend</v-card-title>
              <v-list>
                <v-list-item
                  v-for="member in frontTeam"
                  :key="member.name"
                  class="team-member"
                >
                  <v-list-item-title>
                    <a
                      :href="member.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="member-link"
                    >
                      Linkedin
                    </a>
                    <span class="member-info"> - {{ member.name }} - {{ member.year }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="team-card">
              <v-card-title class="team-role">Backend</v-card-title>
              <v-list>
                <v-list-item
                  v-for="member in backTeam"
                  :key="member.name"
                  class="team-member"
                >
                  <v-list-item-title>
                    <a
                      :href="member.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="member-link"
                    >
                      Linkedin
                    </a>
                    <span class="member-info"> - {{ member.name }} - {{ member.year }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import logoImage from "@/assets/logo.png";
import DefaultLayout from "@/views/Commerce/ComponentsCommerce/Footer/DefaultLayout.vue";
const router = useRouter();
const logo = ref(logoImage);

const teamMembers = ref([
  { name: "Kevin Villegas", linkedin: "https://www.linkedin.com/in/kevin--villegas/", role: "Frontend Dev.", year: 2024 },
  { name: "America Viana", linkedin: "https://www.linkedin.com/in/america-viana-313918252/", role: "Frontend Dev.", year: 2024 },
  { name: "Facundo Regner", linkedin: "https://www.linkedin.com/in/facundo-regner-b43ab2266/", role: "Backend Dev.", year: 2024 },
  { name: "Marcelo Bogado", linkedin: "https://www.linkedin.com/in/marcelo-bogado-a26a99216/", role: "Backend Dev.", year: 2024 },
  { name: "Lucia Guillermero", linkedin: "https://www.linkedin.com/in/luu-g/", role: "Backend Dev.", year: 2024 },
  { name: "Tomás Prestia", linkedin: "https://www.linkedin.com/in/tom%C3%A1s-prestia-465424195/", role: "Frontend Dev.", year: 2025 },
  { name: "Piero Layza", linkedin: "https://www.linkedin.com/in/pierolayza/", role: "Frontend Dev.", year: 2025 },
  { name: "Joaquin Bileisis", linkedin: "https://www.linkedin.com/in/joaquin-bileisis-569b50267/", role: "Backend Dev.", year: 2025 },
  { name: "Erika Martinelli", linkedin: "https://www.linkedin.com/in/erika-martinelli-3b79a3205/", role: "Backend Dev.", year: 2025 },
  { name: "Blas Delgado", linkedin: "https://www.linkedin.com/in/blas-ignacio-delgado/", role: "Backend Dev.", year: 2025 },
  { name: "Dario Lafuente", linkedin: "https://www.linkedin.com/in/dar%C3%ADo-rub%C3%A9n-lafuente-89ab341b2/", role: "Frontend Dev.", year: 2025 },
  { name: "Joaquin Petit", linkedin: "https://www.linkedin.com/in/joaquin-rodriguez-petit/", role: "Frontend Dev.", year: 2025 },
  { name: "Santiago Melgarejo", linkedin: "https://www.linkedin.com/in/santiago-melgarejo-a15985328/", role: "Frontend Dev.", year: 2025 },
  { name: "Lucas Blaiotta", linkedin: "https://www.linkedin.com/in/lucas-blaiotta-aguirre/", role: "Backend Dev.", year: 2025 },
  { name: "Franco Nuñez", linkedin: "https://www.linkedin.com/in/franco-nu%C3%B1ez-104609240/", role: "Frontend Dev.", year: 2025},
  { name: "Gaspar Furlan", linkedin: "http://www.linkedin.com/in/gaspar-furlan-b72a9a305", role: "Backend Dev.", year: 2025 },
  { name: "Agustin Alfonso", linkedin: "https://www.linkedin.com/in/agustin-alfonso-1a0ab52a4/", role: "Backend Dev.", year: 2025 },
]);

const frontTeam = computed(() => teamMembers.value.filter(member => member.role === "Frontend Dev."));
const backTeam = computed(() => teamMembers.value.filter(member => member.role === "Backend Dev."));

const navigateToHome = () => {
  router.push({ name: "HomeView" });
};
</script>

<style scoped>
.about-us {
  background: #f3f4f6;
  min-height: 100vh;
  padding: 0;
}

.about-header {
  padding: 0 1rem;
  z-index: 10;
  position: relative;
}

.header-logo {
  height: 48px;
  width: auto;
  cursor: pointer;
  margin-top: 8px;
}

.about-title {
  color: #1a1a1a;
  font-size: 2rem;
  font-weight: bold;
}

.about-content {
  max-width: 1200px;
  margin: 3.5rem auto 0 auto;
  padding: 2.5rem 2rem 0 2rem;
}

.team-image {
  display: flex;
  justify-content: center;
}

.team-photo {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  border: 4px solid #FF6B00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s;
}

.team-photo:hover {
  transform: scale(1.05);
}

.about-text {
  color: #1a1a1a;
  font-size: 1rem;
  line-height: 1.6;
}

.about-text p {
  margin-bottom: 1rem;
  text-indent: 2rem;
}

.team-divider {
  margin: 2rem 0;
  border-color: rgba(0, 0, 0, 0.1);
}

.team-section {
  padding: 2rem;
}

.team-section-title {
  text-align: center;
  color: #222;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.team-grid {
  margin: 2rem auto;
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.team-card {
  background: #f3f4f6;
  border-radius: 8px;
  width: 100%;
  margin: 0 auto 2rem auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.team-role {
  color: #fff;
  background: #2968C8;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 0.75rem 0;
}

.v-list {
  width: 100%;
}

.team-member {
  transition: transform 0.2s;
  text-align: left;
  white-space: normal;
  word-break: break-word;
  padding: 0.5rem 1rem;
}

.v-list-item-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.member-link {
  color: #FF6B00;
  text-decoration: none;
  word-break: break-all;
}

.member-info {
  color: #333;
  font-size: 1rem;
  word-break: break-word;
}

@media (min-width: 900px) {
  .team-grid {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }
  .team-card {
    width: 100%;
    min-width: 280px;
    max-width: 350px;
  }
}

@media (max-width: 900px) {
  .team-grid {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .team-card {
    width: 100%;
    min-width: 220px;
    max-width: 100%;
  }
}

@media (max-width: 960px) {
  .about-content {
    padding-top: 4.5rem;
  }
}
</style>
