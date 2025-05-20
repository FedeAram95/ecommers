<template>
  <v-card class="product-form-card">
    <v-card-title class="product-form-header">
      <h2 class="form-title">Crear Nuevo Producto</h2>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="createProduct" class="product-form">
        <v-text-field
          v-model="product.name"
          label="Nombre del Producto"
          required
          variant="outlined"
          density="comfortable"
        />

        <v-textarea
          v-model="product.description"
          label="Descripción"
          rows="3"
          required
          variant="outlined"
          density="comfortable"
        />

        <v-text-field
          v-model="product.price"
          label="Precio"
          type="number"
          step="0.01"
          min="0"
          prefix="$"
          required
          variant="outlined"
          density="comfortable"
        />

        <v-text-field
          v-model="product.stock"
          label="Stock"
          type="number"
          min="0"
          required
          variant="outlined"
          density="comfortable"
        />

        <v-select
          v-model="product.categoryId"
          :items="categories"
          item-title="description"
          item-value="id"
          label="Categoría"
          required
          variant="outlined"
          density="comfortable"
        >
          <template v-slot:prepend-item>
            <v-list-item title="Seleccionar una categoría" disabled />
          </template>
        </v-select>

        <v-text-field
          v-model="product.tags"
          label="Etiquetas (separadas por comas)"
          placeholder="tag1, tag2, tag3"
          variant="outlined"
          density="comfortable"
        />

        <v-file-input
          v-model="selectedImage"
          label="Imagen (Máximo 3MB)"
          accept="image/*"
          prepend-icon="mdi-camera"
          variant="outlined"
          density="comfortable"
          @change="handleImageUpload"
        />

        <v-img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Vista previa de imagen"
          class="image-preview"
          cover
        />

        <v-card-actions class="form-actions">
          <v-btn
            variant="outlined"
            color="grey"
            @click="$router.push({ name: 'home' })"
            class="action-btn"
          >
            Cancelar
          </v-btn>
          
          <v-btn
            type="submit"
            color="teal"
            :loading="isLoading"
            class="action-btn"
          >
            {{ isLoading ? 'Procesando...' : 'Crear Producto' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>

    <SuccessMessage v-if="showSuccessMessage" />
    <ErrorMessage v-if="showErrorMessage" />
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/plugins/axios';
import SuccessMessage from "@/generalComponents/AlertMessage/SuccessMessage.vue";
import ErrorMessage from "@/generalComponents/AlertMessage/ErrorMessage.vue";

const product = ref({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  categoryId: "",
  tags: "",
});

const categories = ref([]);
const selectedImage = ref(null);
const isLoading = ref(false);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);

onMounted(async () => {
  try {
    const response = await api.get("/category");
    categories.value = response.data;
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 3 * 1024 * 1024) {
    selectedImage.value = file;
  } else {
    alert("El archivo supera los 3MB o no es válido.");
  }
};

const imagePreview = computed(() =>
  selectedImage.value ? URL.createObjectURL(selectedImage.value) : null
);

const createProduct = async () => {
  try {
    isLoading.value = true;
    const formData = new FormData();
    formData.append("product", JSON.stringify(product.value));
    if (selectedImage.value) {
      formData.append("image", selectedImage.value);
    }

    const response = await api.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      showSuccessMessage.value = true;
    }
  } catch (error) {
    showErrorMessage.value = true;
    console.error("Error al crear producto:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.product-form-card {
  max-width: 600px;
  margin: 0 auto;
}

.product-form-header {
  background: linear-gradient(to right, #4CAF50, #009688);
  padding: 24px;
}

.form-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

.image-preview {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  margin: 16px auto;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
}

.action-btn {
  flex: 1;
}
</style>
