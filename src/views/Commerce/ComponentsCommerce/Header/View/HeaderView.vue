<template>
  <header
    class="header"
    :style="headerStyle"
  >
    <div class="header-content">
      <div class="header-left">
        <img
          :src="logo"
          @click="goHome"
          alt="Logo"
          class="logo"
        />
        <DropdownMenu v-if="!isSimpleHeader" />
      </div>

      <div class="header-right">

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
          <v-btn 
            @click="handleUserClick" 
            class="login-button" 
            dense 
            rounded
          >
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

import logoImage from "@/assets/logo.png";
import headerBg from "@/assets/Ohnolore2.png"; 

import DropdownMenu from "@/views/Commerce/ComponentsCommerce/DropdownMenu/View/DropdownMenu.vue";

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

const headerStyle = {
  backgroundImage: `url(${headerBg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
};
</script>

<style scoped>
.header {
  position: relative;
  top: 0;
  z-index: 100000;
  width: 100%;
  height: 180px; 
  padding-top: 30px;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}

.header::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.2); /* overlay sutil */
  z-index: 0;
  pointer-events: none;
}

.header > .header-content {
  position: relative;
  z-index: 1;
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
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: black;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.logout {
  border-top: 1px solid #e5e7eb;
}

.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-svg {
  color: white;
  height: 24px;
  width: 24px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #FF8D3F;
  color: white;
  font-weight: 700;
  font-size: 12px;
  padding: 0 6px;
  border-radius: 20px;
}

.login-button {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  padding: 6px 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #FF8D3F;
  border-color: #FF8D3F;
  color: white;
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(24px);
    opacity: 0;
  }
}
</style>
