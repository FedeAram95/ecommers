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
      <template #item.photoUrl="{ item }">
        <img :src="item.photoUrl" alt="Producto" class="product-image" />
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
            Categoría:
            <input type="text" v-model="editedProduct.category" required />
          </label>

          <div class="dialog-actions">
            <button type="button" @click="closeDialog">Cancelar</button>
            <button type="submit" :disabled="!editedProduct.name || !editedProduct.description">
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
const saving = ref(false)

const headers = [
  { text: 'Nombre', value: 'name', align: 'center' },
  { text: 'Descripción', value: 'description', align: 'center' },
  { text: 'Precio', value: 'price', align: 'center' },
  { text: 'Stock', value: 'stock', align: 'center' },
  { text: 'Imagen', value: 'photoUrl', align: 'center' },
  { text: 'Categoría', value: 'category', align: 'center' },
  { text: 'Acciones', value: 'actions', align: 'center' },
]

const editedIndex = ref(-1)
const editedProduct = reactive({
  id: null,
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  photoUrl: null,
})

const imageFile = ref(null)
const imagePreview = ref(null)

const isEditing = computed(() => editedIndex.value > -1)

const fetchProducts = async () => {
  try {
    const { data } = await api.get('/product')
    products.value = data
  } catch (error) {
    console.error('Error al cargar productos:', error)
    Swal.fire('Error', 'No se pudieron cargar los productos.', 'error')
  }
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
      Object.assign(editedProduct, product)
      imagePreview.value = product.photoUrl || null
      imageFile.value = null
      dialog.value = true
    } catch (error) {
      console.error('Error al cargar producto:', error)
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
      category: '',
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
    const formData = new FormData()

    const payload = {
      id: editedProduct.id,
      name: editedProduct.name,
      description: editedProduct.description,
      price: editedProduct.price,
      stock: editedProduct.stock,
      category: editedProduct.category,
    }

    formData.append(
      'product',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    )
    console.log('Payload:', payload)
    console.log('Image file:', imageFile.value)
    if (imageFile.value) {
      formData.append('image', imageFile.value)
    }

    if (isEditing.value) {
      await api.put(`/product/${editedProduct.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } else {
      await api.post('/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
    console.error('Error al guardar producto:', error)
    Swal.fire('Error', 'No se pudo guardar el producto.', 'error')
  } finally {
    saving.value = false
  }
}

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
      console.error('Error al eliminar producto:', error)
      Swal.fire('Error', 'No se pudo eliminar el producto.', 'error')
    }
  }
}

const editProduct = (object) => openDialog(object)
onMounted(fetchProducts)
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
  max-width: 80px;
  max-height: 80px;
  border-radius: 8px;
}

.dialog-backdrop {
  position: fixed;
  inset: 0;
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
  width: 100%;
  max-width: 500px;
  margin: 1rem;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  user-select: none;
}

.dialog h3 {
  margin-top: 0;
  font-weight: 600;
  color: #222;
  user-select: none;
}

form label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: #333;
  user-select: none;
}

form input[type='text'],
form input[type='number'],
form textarea {
  width: 100%;
  padding: 8px 10px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  font-family: inherit;
  box-sizing: border-box;
}

form textarea {
  resize: vertical;
  min-height: 60px;
}

.image-preview {
  margin-bottom: 1rem;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 150px;
  border-radius: 8px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}
</style>
