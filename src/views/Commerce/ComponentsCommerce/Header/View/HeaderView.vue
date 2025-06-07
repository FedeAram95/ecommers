<template>
  <header class="header">
    <div class="header__logo">
      <img src="@/assets/logo.png" alt="Logo" class="logo-icon" />
      <span class="logo-text">Ohnolore</span>
    </div>

    <nav class="header__nav">
      <router-link to="/home" class="nav-link">Inicio</router-link>
      <router-link to="/payment" class="nav-link">Tienda</router-link>
      <router-link to="/about" class="nav-link">Acerca de</router-link>
      <router-link to="/admin-panel" class="nav-link">Contacto</router-link>
    </nav>

    <div class="header__icons">
      <i class="fas fa-user icon" @click="goToProfile" title="Perfil"></i>
      <i class="fas fa-search icon" @click="goToSearch" title="Buscar"></i>
      <i class="fas fa-heart icon" @click="goToFavorites" title="Favoritos"></i>
      <i class="fas fa-shopping-cart icon" @click="goToCart" title="Carrito"></i>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.min.css'

const router = useRouter()

const goToProfile = () =>  router.push("/login") 
const goToSearch = () => router.push({ name: 'Search' })
const goToFavorites = () => router.push({ name: 'AdminPanel' })
const goToCart = () => router.push({ name: 'Cart' })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background-color: #d6bfa3; 
  border-bottom: 1px solid #d6bfa3;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.logo-icon {
  width: 50px;
  height: 50px;
}

.logo-text {
  font-weight: 600;
  font-size: 1.5rem;
}

.header__nav {
  display: flex;
  gap: 1.6rem;
}

.nav-link {
  text-decoration: none;
  color: #111;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #b48b46; 
}

.header__icons {
  display: flex;
  gap: 1.2rem;
}

.icon {
  font-size: 1.2rem;
  color: #111;
  cursor: pointer;
  transition: color 0.2s;
}

.icon:hover {
  color: #b48b46;
}
</style>
