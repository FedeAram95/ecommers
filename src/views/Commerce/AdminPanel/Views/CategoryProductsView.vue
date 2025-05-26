<template>
  <div>
    <div class="header-row">
      <h2>Gestión de Categorías</h2>
      <button class="btn btn-primary" @click="openDialog()">
        + Agregar Categoría
      </button>
    </div>

    <SuperTable
      class="mt-4"
      :headers="headers"
      :items="categories"
      item-key="id"
    >
      <!-- Slot para acciones en menú desplegable -->
      <template #actions="{ item }">
        <button class="icon-button" @click="openDialog(item)" aria-label="Editar categoría">✏️</button>
        <button class="icon-button" @click="deleteCategory(item.id)" aria-label="Eliminar categoría">🗑️</button>
      </template>
    </SuperTable>

    <!-- Diálogo para agregar/editar -->
    <div v-if="dialog" class="dialog-backdrop" role="dialog" aria-modal="true">
      <div class="dialog">
        <h3>{{ editedIndex === -1 ? 'Agregar Categoría' : 'Editar Categoría' }}</h3>
        <form @submit.prevent="saveCategory">
          <label>
            Nombre:
            <input type="text" v-model="editedCategory.description" autofocus />
          </label>
          <div class="dialog-actions">
            <button type="button" @click="closeDialog()">Cancelar</button>
            <button type="submit" :disabled="!editedCategory.description">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SuperTable from '@/views/Commerce/AdminPanel/Views/SuperTable.vue'
import api from '@/plugins/axios'

const dialog = ref(false)

const headers = [
  { text: 'Nombre', value: 'description', align: 'center' },
  { text: 'Acciones', value: 'actions', align: 'center' }
]

const categories = ref([])

const editedIndex = ref(-1)
const editedCategory = reactive({
  id: null,
  description: ''
})

const openDialog = (item = null) => {
  if (item) {
    editedIndex.value = categories.value.findIndex(c => c.id === item.id)
    Object.assign(editedCategory, item)
  } else {
    editedIndex.value = -1
    editedCategory.id = null
    editedCategory.description = ''
  }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const saveCategory = () => {
  if (!editedCategory.description) return

  if (editedIndex.value > -1) {
    categories.value[editedIndex.value] = { ...editedCategory }
  } else {
    const newId = categories.value.length ? Math.max(...categories.value.map(c => c.id)) + 1 : 1
    categories.value.push({ ...editedCategory, id: newId })
  }

  closeDialog()
}

const deleteCategory = (id) => {
  const idx = categories.value.findIndex(c => c.id === id)
  if (idx > -1) {
    categories.value.splice(idx, 1)
  }
}

onMounted(async () => {
  try {
    const response = await api.get('/category')
    if (Array.isArray(response.data) && response.data.length > 0) {
      categories.value = response.data
    } else {
      categories.value = []
    }
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    categories.value = []
  }
})
</script>

<style scoped>
.header-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

h2 {
  margin: 0;
  color: #222; /* color más oscuro pero suave */
  font-weight: 600;
  font-size: 1.8rem;
  user-select: none;
}

.btn {
  background-color: #007bff;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
  white-space: nowrap;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.mt-4 {
  margin-top: 1rem;
}

/* Centramos texto en las columnas */
.super-table th,
.super-table td {
  text-align: center;
}

/* Icon buttons para acciones */
.icon-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 8px;
  padding: 4px;
  transition: color 0.3s ease;
  user-select: none;
}

.icon-button:hover {
  color: #007bff;
}

/* Diálogo */
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  user-select: none;
}

.dialog h3 {
  margin-top: 0;
  font-weight: 600;
  color: #222;
}

.dialog label {
  display: block;
  margin: 1rem 0 0.5rem;
  font-weight: 500;
  color: #444;
}

.dialog input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.dialog input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 3px rgba(0,123,255,0.5);
}

.dialog-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.dialog-actions button {
  padding: 6px 16px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.dialog-actions button[type="button"] {
  background: #e0e0e0;
  color: #555;
}

.dialog-actions button[type="button"]:hover {
  background: #c0c0c0;
}

.dialog-actions button[type="submit"] {
  background-color: #007bff;
  color: white;
}

.dialog-actions button[type="submit"]:disabled {
  background-color: #a0c4ff;
  cursor: not-allowed;
}

.dialog-actions button[type="submit"]:not(:disabled):hover {
  background-color: #0056b3;
}
</style>
