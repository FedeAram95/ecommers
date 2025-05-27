<template>
  <div>
    <!-- Encabezado -->
    <div class="header-row ml-15">
      <h2>GESTIÓN DE PRODUCTOS</h2>
      <button class="btn btn-primary" @click="openDialog()">+ Agregar Producto</button>
    </div>

    <!-- Tabla de Productos -->
    <SuperTable
      class="mt-4 super-table"
      :headers="headers"
      :items="products"
      item-key="id"
      @edit="editProduct"
      @delete="deleteProduct"
    >
      <template item.photoUrl="{ item }">
        <img :src="item.photoUrl" alt="Producto" class="product-image" />
      </template>
      <template #item.category="{ item }">
        {{ getCategoryDescription(item.categoryId) }}
      </template>
    </SuperTable>

    <!-- Modal Agregar/Editar Producto -->
    <div
      v-if="dialog"
      class="dialog-backdrop"
      role="dialog"
      aria-modal="true"
      @keydown.esc="closeDialog"
    >
      <div class="dialog" @click.stop>
        <h3>{{ isEditing ? 'Editar Producto' : 'Agregar Producto' }}</h3>

        <form @submit.prevent="saveProduct" novalidate>
          <label>
            Nombre:
            <input type="text" v-model="editedProduct.name" autofocus required />
          </label>

          <label>
            Descripción:
            <textarea v-model="editedProduct.description" required></textarea>
          </label>

          <label>
            Precio:
            <input type="number" v-model.number="editedProduct.price" min="0" step="0.01" required />
          </label>

          <label>
            Stock:
            <input type="number" v-model.number="editedProduct.stock" min="0" required />
          </label>

          <label>
            Imagen:
            <input type="file" accept="image/*" @change="onFileChange" />
          </label>

          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Vista previa imagen" />
          </div>

          <label>
            Categoría Edit:
              <select v-model="editedProduct.categoryId" @change="categoryChanged" required>
                <option disabled value="">Seleccione una categoría</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.description }}
                </option>
              </select>
          </label>

          <div class="dialog-actions">
            <button type="button" @click="closeDialog">Cancelar</button>
            <button type="submit" :disabled="!editedProduct.name || !editedProduct.description || !editedProduct.categoryId">
              {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import SuperTable from '@/views/Commerce/AdminPanel/Views/SuperTable.vue'
import api from '@/plugins/axios'
import Swal from 'sweetalert2'

const dialog = ref(false)
const products = ref([])
const categories = ref([])
const saving = ref(false)
const imageFile = ref(null)
const imagePreview = ref(null)
const editedIndex = ref(-1)

const editedProduct = reactive({
  id: null,
  name: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: '',
  photoUrl: null,
})

const isEditing = computed(() => editedIndex.value > -1)

const headers = [
  { text: 'Nombre', value: 'name', align: 'center' },
  { text: 'Descripción', value: 'description', align: 'center' },
  { text: 'Precio', value: 'price', align: 'center' },
  { text: 'Stock', value: 'stock', align: 'center' },
  { text: 'Imagen', value: 'imagen', align: 'center' },
  { text: 'Categoría', value: 'categoryName', align: 'center' },
  { text: 'Acciones', value: 'actions', align: 'center' },
]

function getCategoryDescription(categoryId) {
  const category = categories.value.find((cat) => cat.id === categoryId)
  return category ? category.description : ''
}

const fetchCategories = async () => {
  try {
    const { data } = await api.get('/categoryTypes')
    categories.value = data
  } catch (error) {
    Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error')
  }
}

const fetchProducts = async () => {
  try {
    const { data } = await api.get('/product')
    products.value = data
  } catch (error) {
    Swal.fire('Error', 'No se pudieron cargar los productos.', 'error')
  }
}

function base64ToFile(base64String, filename) {
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

const fetchProductById = async (id) => {
  const { data } = await api.get(`/product/${id}`)
  return data
}

const openDialog = async (object = null) => {
  if (object) {
    try {
      const product = await fetchProductById(object.id)
      editedIndex.value = products.value.findIndex((p) => p.id === product.id)
      editedProduct.id = product.id
      editedProduct.name = product.name
      editedProduct.description = product.description
      editedProduct.price = product.price
      editedProduct.stock = product.stock
      editedProduct.photoUrl = product.photoUrl || null
      editedProduct.categoryId = product.categoryId || ''
      imagePreview.value = product.photoUrl || null
      imageFile.value = null
      dialog.value = true
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar el producto.', 'error')
    }
  } else {
    editedIndex.value = -1
    Object.assign(editedProduct, {
      id: null,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      photoUrl: null,
    })
    imagePreview.value = null
    imageFile.value = null
    dialog.value = true
  }
}

const closeDialog = () => {
  dialog.value = false
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  imageFile.value = file
  imagePreview.value = file ? URL.createObjectURL(file) : null
}

  const saveProduct = async () => {
    saving.value = true
    try {
      const payload = {
        id: editedProduct.id,
        name: editedProduct.name,
        description: editedProduct.description,
        price: editedProduct.price,
        stock: editedProduct.stock,
        image: String(await getBase64(imageFile.value)),
        categoryId: Number(editedProduct.categoryId)
      }

      if (isEditing.value) {
        await api.put(`/product/${editedProduct.id}`, payload, {
          headers: { 'Content-Type': 'application/json' },
        })
      } else {
        await api.post('/product', payload, {
          headers: { 'Content-Type': 'application/json' },
        })
      }

      await fetchProducts()
      closeDialog()
      Swal.fire({
        icon: 'success',
        title: 'Producto guardado',
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el producto.', 'error')
    } finally {
      saving.value = false
    }
  }
  function categoryChanged(event) {
    editedProduct.categoryId = event.target.value
  }
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
// Eliminar producto
const deleteProduct = async (object) => {
  const result = await Swal.fire({
    title: '¿Seguro que quieres eliminar este producto?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  })

  if (result.isConfirmed) {
    try {
      await api.delete(`/product/${object.id}`)
      products.value = products.value.filter((p) => p.id !== object.id)
      Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success')
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar el producto.', 'error')
    }
  }
}

const editProduct = (object) => openDialog(object)

onMounted(() => {
  fetchCategories()
  fetchProducts()
})
</script>

<style scoped>
.header-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
}

h2 {
  margin: 0;
  color: #222;
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
  flex-shrink: 0;
}

.btn:hover {
  background-color: #0056b3;
}

.mt-4 {
  margin-top: 1rem;
}

.super-table {
  overflow-x: auto;
  display: block;
}

.super-table th,
.super-table td {
  text-align: center;
}

.product-image {
  max-width: 70px;
  border-radius: 6px;
}

.dialog-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.dialog {
  background: white;
  border-radius: 12px;
  width: 420px;
  padding: 20px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.2);
}

.dialog h3 {
  margin: 0 0 12px;
}

.dialog label {
  display: block;
  margin: 8px 0 12px;
  font-weight: 600;
  font-size: 0.95rem;
  color: #444;
}

.dialog input[type="text"],
.dialog input[type="number"],
.dialog textarea,
.dialog select {
  width: 100%;
  padding: 6px 8px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  font-weight: 400;
  outline-offset: 2px;
  outline-color: #3a86ff;
  transition: border-color 0.3s ease;
}

.dialog textarea {
  resize: vertical;
  min-height: 60px;
}

.dialog input[type="file"] {
  padding: 3px;
}

.dialog input[type="text"]:focus,
.dialog input[type="number"]:focus,
.dialog textarea:focus,
.dialog select:focus {
  border-color: #3a86ff;
}

.image-preview {
  margin-bottom: 8px;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 150px;
  border-radius: 6px;
  object-fit: contain;
  user-select: none;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.dialog-actions button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
}

.dialog-actions button[type="button"] {
  background-color: #ccc;
  color: #333;
}

.dialog-actions button[type="button"]:hover {
  background-color: #bbb;
}

.dialog-actions button[type="submit"] {
  background-color: #3a86ff;
  color: white;
}

.dialog-actions button[type="submit"]:disabled {
  background-color: #89b8ff;
  cursor: not-allowed;
}
</style>
