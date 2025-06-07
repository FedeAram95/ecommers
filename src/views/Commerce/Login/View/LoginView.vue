<template>
  <div class="login-page">
    <HeaderView />

    <main class="login-main">
      <div class="login-card">
        <h2 class="login-title">¡Te damos la bienvenida!</h2>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="password-wrapper">
              <input
                :type="passwordVisible ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button type="button" @click="togglePasswordVisibility" class="toggle-btn" tabindex="-1">
                <span v-if="passwordVisible">
                  <i class="fas fa-eye"></i>
                </span>
                <span v-else>
                  <i class="fas fa-eye-slash"></i>
                </span>
              </button>
            </div>
          </div>

          <button type="submit" class="submit-btn">Ingresar</button>

          <div class="register">
            ¿No tenés cuenta?
            <span class="link" @click="goToRegister">Registrate</span>
          </div>
        </form>
      </div>
    </main>

    <FooterView />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import api from '@/plugins/axios';
import HeaderView from '@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue';
import FooterView from '@/views/Commerce/ComponentsCommerce/Footer/View/FooterView.vue';

const username = ref('');
const password = ref('');
const passwordVisible = ref(false);
const router = useRouter();
const store = useUserStore();

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const mapRole = (roleNumber) => {
  switch (roleNumber) {
    case '1': return 'ADMIN';
    case '2': return 'CLIENT';
    case '3': return 'SELLER';
    default: return 'CLIENT';
  }
};

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      username: username.value,
      password: password.value,
    });

    const { role, username: returnedUsername } = response.data;
    const mappedRole = mapRole(role);

    localStorage.setItem('username', returnedUsername);
    localStorage.setItem('userRole', mappedRole);
    store.setUserRole(mappedRole);

    router.push('/home');
  } catch (error) {
    if (error.response?.status === 401) {
      alert('Usuario o contraseña incorrectos');
    } else if (error.response?.status === 400) {
      alert('Faltan campos requeridos');
    } else {
      alert('Error de conexión con el servidor');
    }
  }
};

// Nuevo método para manejar el clic en "Registrate"
const goToRegister = () => {
  router.push({ name: "MyAccountView" });
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
}

.login-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.login-card {
  background-color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-group input {
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  color: #374151;
}

.form-group input:focus {
  border-color: #3b82f6;
  outline: none;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: 100%;
  padding-right: 2.5rem;
}

.toggle-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.25rem;
}

.submit-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #2563eb;
}

.register {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 1rem;
}

.register .link {
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;
}
</style>
