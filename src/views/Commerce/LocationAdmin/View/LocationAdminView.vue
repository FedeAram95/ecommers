<template>
    <div class="locations-container">
        <div class="header-container">
            <h1 class="page-title">Gestor de Localidades</h1>
            <h2 class="add-user-container">
                <button class="add-user-button" >+ Usuario nuevo</button>
            </h2>
        </div>
        <div class="table-container">
            <div class="table-wrapper">
                <table class="locations-table">
                    <thead>
                        <tr class="table-header">
                            <th @click="toggleSection('paises')" class="clickable">Países</th>
                            <th @click="toggleSection('provincias')" class="clickable">Provincias</th>
                            <th @click="toggleSection('ciudades')" class="clickable">Ciudades</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(location, index) in locations" :key="index" class="table-row">
                            <td :colspan="3" class="centered-content">
                                <span v-if="activeSection === 'paises'">{{ location.pais }}</span>
                                <span v-if="activeSection === 'provincias'">{{ location.provincia }}</span>
                                <span v-if="activeSection === 'ciudades'">{{ location.ciudad }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const locations = ref([
    { pais: 'Argentina', provincia: 'Buenos Aires', ciudad: 'Bahía Blanca' },
    { pais: 'Argentina', provincia: 'Córdoba', ciudad: 'Villa Carlos Paz' },
    { pais: 'Argentina', provincia: 'Santa Fe', ciudad: 'Rosario' },
    { pais: 'Argentina', provincia: 'Mendoza', ciudad: 'San Rafael' },
    { pais: 'Argentina', provincia: 'Salta', ciudad: 'Cafayate' },
]);

const activeSection = ref('paises');

function toggleSection(section) {
    activeSection.value = section;
}

</script>

<style scoped>
.locations-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    padding: 20px;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
}

.page-title {
    font-size: 2rem;
    font-weight: 600;
    color: #1e3a8a;
    margin: 0 auto;
    text-align: center;
    flex: 1;
}

.add-user-container {
    margin: 0;
}

.add-user-button {
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #1e3a8a;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.add-user-button:hover {
    background-color: #3b82f6;
}

.table-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid #1e3a8a;
    background-color: white;
    max-height: 70vh;
}

.table-wrapper {
    overflow-x: auto;
    width: 100%;
    padding: 1rem;
}

.locations-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.table-header {
    background-color: #1e3a8a;
    color: white;
}

.table-header th {
    padding: 12px 16px;
    text-align: center;
    white-space: nowrap;
    font-weight: 500;
    cursor: pointer;
    width: 33.33%;
}

.table-header th.clickable:hover {
    background-color: #3b82f6;
    color: white;
}

.table-row {
    transition: background-color 0.3s;
}

.table-row:hover {
    background-color: #bfdbfe;
}

.table-row td {
    padding: 12px 16px;
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid #d1d5db;
}

.centered-content {
    text-align: center;
    vertical-align: middle;
    width: 100%;
}
</style>