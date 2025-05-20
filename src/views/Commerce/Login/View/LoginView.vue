<template>
  <div class="login-container">
    <header class="login-header">
      <router-link to="/home">
        <img :src="logo" alt="Logo" class="logo-image" />
      </router-link>
    </header>
    <div class="login-content">
      <div class="welcome-container">
        <h2 class="welcome-title">¡Te damos la bienvenida!</h2>
      </div>
      <div class="login-box">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username" class="form-label">Usuario</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="form-input"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="form-input password-input"
              placeholder="Ingresa tu contraseña"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="password-toggle"
              tabindex="-1"
            >
              <span v-if="passwordVisible">
                <svg
                  class="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <span v-else>
                <svg
                  class="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
            </button>
          </div>
          <button type="submit" class="submit-button">
            Ingresar
          </button>
          <div class="register-link">
            <span>
              ¿No tenés cuenta? <span class="bold"> Registrate </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logoImage from "@/assets/logo.png";
import { useUserStore } from '@/store';
import api from '@/plugins/axios';

const username = ref("");
const password = ref("");
const passwordVisible = ref(false);
const logo = logoImage;
const router = useRouter();
const store = useUserStore();

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const mapRole = (roleNumber) => {
  switch (roleNumber) {
    case '1':
      return 'ADMIN';
    case '2':
      return 'CLIENT';
    case '3':
      return 'SELLER';
    default:
      return 'CLIENT';
  }
};

const handleLogin = async () => {
  try {
    console.log('Intentando login con:', {
      username: username.value,
      password: password.value
    });
    
    const loginResponse = await api.post(
      '/auth/login',
      {
        username: username.value,
        password: password.value
      }
    );

    console.log('Respuesta del servidor:', loginResponse.data);

    if (loginResponse.data && loginResponse.data.role) {
      const { role, username: returnedUsername } = loginResponse.data;
      const mappedRole = mapRole(role);

      localStorage.setItem('username', returnedUsername);
      localStorage.setItem('userRole', mappedRole);
      store.setUserRole(mappedRole);

      router.push('/home');
    } else {
      throw new Error('Respuesta inválida del servidor');
    }
    
  } catch (error) {
    console.error('Error en login:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      if (error.response.status === 401) {
        alert('Usuario o contraseña incorrectos');
      } else if (error.response.status === 400) {
        alert('Faltan campos requeridos');
      } else {
        alert(`Error al iniciar sesión: ${error.response.data.message || 'Error desconocido'}`);
      }
    } else {
      alert('Error de conexión con el servidor');
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  background: linear-gradient(to top, #3A5199, #f3f4f6);
  padding-top: 2rem;
}

.login-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: #3A5199;
  padding: 0.5rem 0 0.5rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.logo-image {
  height: 4rem;
  width: auto;
}

.login-content {
  padding-top: 8rem;
}

.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.25rem;
}

.welcome-title {
  font-family: 'Custom Font', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 2rem;
}

.login-box {
  width: 100%;
  max-width: 28rem;
  border-radius: 0.5rem;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.form-group {
  position: relative;
  margin-bottom: 2rem;
}

.form-label {
  font-family: 'Custom Font', sans-serif;
  margin-bottom: 0.75rem;
  display: block;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0.75rem;
  color: #6b7280;
}

.form-input:focus {
  border-color: #3b82f6;
  outline: none;
}

.password-input {
  padding-right: 2.5rem;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 2.75rem;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
}

.password-toggle:focus {
  outline: none;
}

.icon {
  height: 1.5rem;
  width: 1.5rem;
  color: #1f2937;
}

.submit-button {
  width: 100%;
  border-radius: 0.25rem;
  background-color: #f97316;
  padding: 0.5rem;
  color: white;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #ea580c;
}

.register-link {
  display: flex;
  justify-content: center;
  padding: 0.75rem 0;
}

.bold {
  font-weight: bold;
}
</style>
