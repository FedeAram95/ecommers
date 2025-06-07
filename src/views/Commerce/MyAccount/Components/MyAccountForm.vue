<template>
  <div class="form-container">
    <section class="profile-section">
      <img
        class="profile-image"
        src="@/assets/profile-placeholder.png"
        alt="Imagen de perfil"
      />
      <h2 class="profile-title">Mi perfil</h2>
      <h1 class="profile-subtitle">Actualizá tu información personal</h1>
    </section>

    <section class="form-section">
      <form @submit.prevent="guardarCambios" class="form">
        <div
          class="form-group"
          v-for="field in fields"
          :key="field.model"
          :class="{ 'has-value': user[field.model] }"
        >
          <input
            v-if="field.type !== 'select'"
            :id="field.model"
            :type="field.type"
            v-model="user[field.model]"
            placeholder=" "
            class="form-input"
            autocomplete="off"
          />
          <select
            v-else
            :id="field.model"
            v-model="user[field.model]"
            class="form-input"
          >
            <option value="" disabled selected hidden></option>
            <option
              v-for="option in field.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <label :for="field.model" class="form-label">{{ field.label }}</label>
        </div>

        <div class="button-group">
          <button type="submit" class="button button-primary">
            Guardar Cambios
          </button>
          <button type="button" class="button button-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const user = reactive({
  nombre: "",
  apellido: "",
  email: "",
  dni: "",
  telefono: "",
  pais: "",
  provincia: "",
  localidad: "",
  direccion: "",
});

const paises = ["Argentina", "Chile", "Uruguay", "Brasil"];
const provincias = ["Buenos Aires", "Córdoba", "Santa Fe"];
const localidades = ["La Plata", "Rosario", "Mendoza"];

const fields = [
  { model: "nombre", label: "Nombre", type: "text" },
  { model: "apellido", label: "Apellido", type: "text" },
  { model: "email", label: "Email", type: "email" },
  { model: "dni", label: "DNI", type: "text" },
  { model: "telefono", label: "Número de teléfono", type: "text" },
  { model: "pais", label: "País", type: "select", options: paises },
  { model: "provincia", label: "Provincia", type: "select", options: provincias },
  { model: "localidad", label: "Localidad", type: "select", options: localidades },
  { model: "direccion", label: "Número y dirección", type: "text" },
];
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column; 
  flex-wrap: nowrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;
  background-color: #fafafa;
  min-height: 100vh;
}

.profile-section {
  width: 100%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 2rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.3s ease;
}

.profile-section:hover {
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.15);
}

.profile-image {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid #ddd;
}

.profile-title {
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  color: #111;
}

.profile-subtitle {
  font-weight: 400;
  font-size: 1rem;
  color: #555;
  margin: 0;
}

.form-section {
  width: 100%;
  max-width: 420px;
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.3s ease;
}

.form-section:hover {
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.15);
}

.form {
  width: 100%;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-input {
  font-size: 1rem;
  padding: 1.2rem 1rem 0.4rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #fafafa;
  color: #222;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #3a5199;
  background-color: #fff;
  box-shadow: 0 0 5px #3a5199aa;
}

select.form-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3csvg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
  cursor: pointer;
}

/* Label flotante */
.form-label {
  position: absolute;
  left: 1rem;
  top: 1.25rem;
  color: #777;
  font-size: 1rem;
  font-weight: 500;
  pointer-events: none;
  background: #fff;
  padding: 0 0.25rem;
  transition: all 0.25s ease;
  user-select: none;
  border-radius: 0.25rem;
}

/* Cuando el input está enfocado o tiene valor, sube el label */
.form-input:focus + .form-label,
.form-group.has-value .form-label {
  top: -0.5rem;
  left: 0.8rem;
  font-size: 0.8rem;
  color: #3a5199;
  font-weight: 600;
}

.form-input::placeholder {
  color: transparent;
}

.form-group select.form-input:focus + .form-label,
.form-group.has-value select.form-label {
  top: -0.5rem;
  left: 0.8rem;
  font-size: 0.8rem;
  color: #3a5199;
  font-weight: 600;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

.button {
  flex: 1;
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.button-primary {
  background-color: #d6bfa3;
  color: white;
  border-color: #d6bfa3;
}

.button-primary:hover {
  background-color: #d6bfa3;
  border-color: #d6bfa3;
}

.button-secondary {
  background-color: transparent;
  color: #d6bfa3;
  border-color: #d6bfa3;
}

.button-secondary:hover {
  background-color: #d6bfa3;
  color: white;
  border-color: #d6bfa3;
}

@media (min-width: 768px) {
  .form-container {
    flex-direction: row; 
    gap: 4rem;
    padding: 3rem 3rem;
    align-items: flex-start; 
  }

  .profile-section {
    max-width: 320px;
    flex-shrink: 0;
  }

  .form-section {
    max-width: 480px;
    flex-grow: 1;
    padding: 2.5rem 3rem;
  }

  .profile-image {
    width: 112px;
    height: 112px;
  }

  .profile-title {
    font-size: 1.75rem;
  }

  .profile-subtitle {
    font-size: 1.125rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .button-group {
    max-width: 420px;
  }
}
</style>
