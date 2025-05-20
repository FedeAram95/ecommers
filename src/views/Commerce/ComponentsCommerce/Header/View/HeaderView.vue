<template>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <LandingButton/>
        <img
          :src="logo"
          @click="goHome"
          alt="Logo"
          class="logo"
        />
        <DropdownMenu v-if="!isSimpleHeader" />
      </div>

      <div class="header-right">
        <SearchBar
          v-if="!isSimpleHeader"
          :fetchSuggestions="fetchSuggestions"
          @select-suggestion="handleSuggestionSelect"
        />

        <div v-if="loggedIn" class="user-menu">
          <div @click.stop="toggleDropdown" class="user-button">
            <span class="username">{{ username }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="dropdown-icon"
              :class="{ 'rotated': showDropdown }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              style="stroke-width: 2; stroke-linecap: round; stroke-linejoin: round"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <Transition name="dropdown" mode="out-in">
            <div v-if="showDropdown" @click.stop class="dropdown-menu">
              <button @click="goToMyAccount" class="dropdown-item">
                Mi Cuenta
              </button>
              <button
                v-if="isAdmin"
                @click="goToAdminPanel"
                class="dropdown-item"
              >
                Panel Admin
              </button>
              <button @click="handleLogout" class="dropdown-item logout">
                Cerrar Sesión
              </button>
            </div>
          </Transition>
        </div>

        <template v-else>
          <v-btn @click="handleUserClick" class="login-button">
            Iniciar Sesión
          </v-btn>
        </template>

        <div v-if="!isSimpleHeader" class="cart-icon" @click="goToCart">
          <svg
            class="cart-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="stroke-width: 2; stroke: currentColor; fill: none; stroke-linecap: round; stroke-linejoin: round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="9" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3-2l1-7h-15.2" />
          </svg>
          <Transition name="bounce">
            <span v-if="cartCount > 0" key="cart-count" class="cart-count">
              {{ cartCount }}
            </span>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store";
import api from '@/plugins/axios';

import LandingButton from "@/generalComponents/LandingButton/View/LandingButton.vue";
import logoImage from "@/assets/logo.png";
import DropdownMenu from "@/views/Commerce/ComponentsCommerce/DropdownMenu/View/DropdownMenu.vue";
import SearchBar from "@/views/Commerce/ComponentsCommerce/Header/Component/SearchBar.vue";

const router = useRouter();
const route = useRoute();
const store = useUserStore();
const logo = logoImage;
const username = ref(null);
const loggedIn = ref(false);
const showDropdown = ref(false);
const cartCount = ref(0);
const isSimpleHeader = ref(false);

const simpleHeaderRoutes = ["AboutUs", "AskQuestion"];

const updateHeaderMode = () => {
  isSimpleHeader.value = simpleHeaderRoutes.includes(route.name);
};

const isAdmin = computed(() => store.getUserRole === "ADMIN");

const goHome = () => {
  router.push({ name: "HomeView" });
};

const goToMyAccount = () => {
  router.push({ name: "MyAccountView" });
};

const goToAdminPanel = () => {
  router.push({ name: "AdminPanel" });
};

const handleLogout = () => {
  localStorage.removeItem("username");
  username.value = null;
  loggedIn.value = false;
  router.push("/");
};

const handleUserClick = () => {
  router.push("/login");
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const goToCart = () => {
  router.push({ name: "Cart" });
};

const handleClickOutside = (event) => {
  const dropdown = document.querySelector(".user-menu");
  if (dropdown && !dropdown.contains(event.target)) {
    showDropdown.value = false;
  }
};

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.value = cart.reduce((acc, item) => acc + item.quantity, 0);
};

const fetchSuggestions = async (query) => {
  try {
    const response = await api.get(`api/product?keyword=${query}`);
    const results = response.data;
    const normalizedQuery = normalizeText(query);
    return results.filter((item) => matchesMultipleTags(item, normalizedQuery));
  } catch (error) {
    return error;
  }
};

const matchesMultipleTags = (product, query) => {
  if (!product.tags) return false;
  const tags = product.tags.toLowerCase();
  return tags.includes(query.toLowerCase());
};

const normalizeText = (text) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const handleSuggestionSelect = (suggestion) => {
  router.push({ name: "ProductDetail", params: { id: suggestion.id } });
};

onMounted(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    username.value = storedUsername;
    loggedIn.value = true;
  }
  updateCartCount();
  document.addEventListener("click", handleClickOutside);
  updateHeaderMode();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(route, () => {
  updateHeaderMode();
});
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  z-index: 100000;
  width: 100%;
  background-color: #2968C8;
  min-height: 140px;
  padding-top: 24px;
  border-bottom: 4px solid #FF8D3F;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  height: 13vh;
  cursor: pointer;
  object-fit: contain;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.user-menu {
  position: relative;
  display: flex;
  align-items: center;
}

.user-button {
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 6px;
  padding: 8px;
  transition: background-color 0.3s;
}

.user-button:hover {
  background-color: #FF8D3F;
}

.username {
  margin-right: 8px;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: #f8fafc;
}

.dropdown-icon {
  height: 20px;
  width: 20px;
  transform: rotate(0deg);
  transition: transform 0.3s;
  color: white;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 8px;
  width: 192px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dropdown-item {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: px;
  padding: 8px 16px;
  text-align: left;
  font-size: 14px;
  color: #374151;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item.logout {
  color: #dc2626;
}

.dropdown-item.logout:hover {
  background-color: #fee2e2;
}

.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-svg {
  margin-top: 4px;
  display: flex;
  height: 32px;
  width: 32px;
  align-items: center;
  text-align: center;
  color: white;
}

.cart-count {
  position: absolute;
  width: 22px;
  height: 22px;
  top: 3px;
  right: 3px;
  background-color: #FF8D3F;
  color: #FFFFFF;
  border-radius: 50%;
  padding: 2px 4px;
  animation: bounce 1.5s ease infinite;
  font-size: 13px;
  font-weight: bold;
}

.login-button {
  padding: 21px 25px;
  border-radius: 9999px;
  font-size: 14px;
  background-color: #FF8D3F;
  color: white;
  text-transform: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 2;
  box-shadow: none;
}

.login-button:hover {
  background-color: #e57a2d;
  box-shadow: none;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .search-container {
    width: 100%;
  }

  .logo {
    height: 8vh;
  }

  .site-name {
    font-size: 1.2rem;
  }
}
</style>

