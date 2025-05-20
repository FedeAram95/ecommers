<template>
    <div class="users-container">
        <h1 class="page-title">Lista de Usuarios</h1>
        <div class="table-container">
            <div class="table-wrapper">
                <table class="users-table">
                    <thead>
                        <tr class="table-header">
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>DNI</th>
                            <th>Número de Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(user, index) in users" 
                            :key="index" 
                            :class="['table-row', index % 2 === 0 ? 'even-row' : 'odd-row']"
                        >
                            <td>{{ user.nombre }}</td>
                            <td>{{ user.apellido }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.dni }}</td>
                            <td>{{ user.telefono }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>

const users = [
    { nombre: 'Martin', apellido: 'Pérez', email: 'martin.perez@hotmail.com', dni: '45949594', telefono: '221-555-1234' },
    { nombre: 'María', apellido: 'Gómez', email: 'maria.gomez@gmail.com', dni: '43595955', telefono: '221-555-5678' },
    { nombre: 'Fernando', apellido: 'Gutierrez', email: 'fernando.gutierrez@gmail.com', dni: '93429634', telefono: '11-555-9101' },
    { nombre: 'Evelyn', apellido: 'Vallejo', email: 'evelyn.vallejo@yahoo.com', dni: '41595349', telefono: '2345-555-5678' },
    { nombre: 'Carlos', apellido: 'Grosso', email: 'carlos.grosso@hotmail.com', dni: '45623212', telefono: '2343-9101' },
];
</script>

<style scoped>
.users-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    margin-left: 24rem;
    margin-top: 12rem;
}

.page-title {
    font-size: 2rem;
    font-weight: 600;
    color: #1e3a8a;
    margin-bottom: 2rem;
    text-align: center;
}

.table-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid #1e3a8a;
    background-color: white;
}

.table-wrapper {
    overflow-x: auto;
    width: 100%;
    padding: 1rem;
}

.users-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
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
}

.table-row {
    transition: background-color 0.3s;
}

.table-row:hover {
    background-color: #bfdbfe;
}

.even-row {
    background-color: #f3f4f6;
}

.odd-row {
    background-color: #e5e7eb;
}

.table-row td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid #d1d5db;
}

@media (max-width: 1024px) {
    .users-container {
        margin-left: 16rem;
    }
}

@media (max-width: 768px) {
    .users-container {
        margin-left: 12rem;
        padding: 10px;
    }

    .page-title {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .users-container {
        margin-left: 10rem;
        padding: 5px;
    }

    .table-row td {
        padding: 8px 12px;
        font-size: 0.9rem;
    }
}

@media (max-width: 360px) {
    .users-container {
        margin-left: 8rem;
    }
}
</style>
