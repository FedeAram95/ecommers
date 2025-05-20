<template>
    <div class="form-container">
        <section class="profile-section">
            <img class="profile-image" src="@/assets/profile-placeholder.png" alt="Imagen de perfil">
            <h2 class="profile-title">Mi perfil</h2>
            <h1 class="profile-subtitle">Actualizá tu información personal</h1>
        </section>

        <section class="form-section">
            <form @submit.prevent="guardarCambios" class="form">
                <div class="form-group">
                    <label class="form-label">Nombre:</label>
                    <input type="text" v-model="user.nombre" placeholder="Ingrese su nombre" class="form-input"/>
                </div>
                <div class="form-group">
                    <label class="form-label">Apellido:</label>
                    <input type="text" v-model="user.apellido" placeholder="Ingrese su apellido" class="form-input"/>
                </div>
                <div class="form-group">
                    <label class="form-label">Email:</label>
                    <input type="email" v-model="user.email" placeholder="Ingrese su email" class="form-input"/>
                </div>
                <div class="form-group">
                    <label class="form-label">DNI:</label>
                    <input type="text" v-model="user.dni" placeholder="Ingrese su DNI" class="form-input"/>
                </div>
                <div class="form-group">
                    <label class="form-label">Número de teléfono:</label>
                    <input type="text" v-model="user.telefono" placeholder="Ingrese su Número de teléfono" class="form-input"/>
                </div>
                <div class="form-group">
                    <label class="form-label">País:</label>
                    <select v-model="user.pais" class="form-input">
                        <option value="">Seleccione un país</option>
                        <option v-for="pais in paises" :key="pais" :value="pais">{{ pais }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Provincia:</label>
                    <select v-model="user.provincia" class="form-input">
                        <option value="">Seleccione una provincia</option>
                        <option v-for="provincia in provincias" :key="provincia" :value="provincia">{{ provincia }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Localidad:</label>
                    <select v-model="user.localidad" class="form-input">
                        <option value="">Seleccione una localidad</option>
                        <option v-for="localidad in localidades" :key="localidad" :value="localidad">{{ localidad }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Número y dirección:</label>
                    <input type="text" v-model="user.direccion" placeholder="Ingrese su Número y dirección" class="form-input"/>
                </div>
                
                <div class="button-group">
                    <button type="submit" class="button button-primary">{{'Guardar Cambios'}}</button>
                    <button type="button" class="button button-secondary">{{'Cancelar'}}</button>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    pais: "",
    provincia: "",
    localidad: "",
    direccion: ""
});

const paises = ["Argentina", "Chile", "Uruguay", "Brasil"];
const provincias = ["Buenos Aires", "Córdoba", "Santa Fe"];
const localidades = ["La Plata", "Rosario", "Mendoza"];

</script>

<style scoped>
.form-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
}

.profile-section {
    width: 100%;
    max-width: 21.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem 2.5rem;
    background-color: #f3f4f6;
    border-radius: 2.5rem;
}

.profile-image {
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 0.625rem;
}

.profile-title {
    font-size: 1.875rem;
    margin: 0;
}

.profile-subtitle {
    font-size: 1rem;
    margin: 0;
}

.form-section {
    width: 100%;
    max-width: 21.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
}

.form {
    width: 100%;
}

.form-group {
    width: 100%;
    margin-bottom: 0.625rem;
    display: flex;
    flex-direction: column;
}

.form-label {
    font-size: 0.875rem;
    text-align: left;
    margin-bottom: 0.25rem;
}

.form-input {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.875rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
}

.button-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1rem;
    gap: 1rem;
}

.button {
    width: 100%;
    padding: 0.875rem;
    border-radius: 0.5rem;
    color: white;
    text-align: center;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
}

.button-primary {
    background-color: #3A5199;
}

.button-primary:hover {
    background-color: #4f5a7c;
}

.button-secondary {
    background-color: #2F2E33;
}

.button-secondary:hover {
    background-color: #702d2d;
}

@media (min-width: 768px) {
    .form-container {
        gap: 15rem;
        padding: 0.625rem;
    }

    .profile-image {
        width: 9.375rem;
        height: 9.375rem;
    }

    .profile-title {
        font-size: 2.25rem;
    }

    .profile-subtitle {
        font-size: 1.125rem;
    }

    .form-section {
        padding: 0;
    }

    .button-group {
        flex-direction: row;
        gap: 4rem;
    }
}
</style>