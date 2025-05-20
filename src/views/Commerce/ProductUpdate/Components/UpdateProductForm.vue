<template>
  <SidebarView />
  <v-container class="update-product-container">
    <v-card v-if="showSuccessMessage" class="message-card">
      <SuccessMessage />
    </v-card>
    <v-card v-else-if="showErrorMessage" class="message-card">
      <ErrorMessage />
    </v-card>
    <v-card v-else class="form-card">
      <v-card-title class="form-header">
        Editar Producto
      </v-card-title>

      <v-form @submit.prevent="updateProduct" class="form-content">
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
          required
          variant="outlined"
          rows="3"
          density="comfortable"
        />

        <v-text-field
          v-model="product.price"
          label="Precio"
          type="number"
          step="0.01"
          min="0"
          required
          variant="outlined"
          density="comfortable"
          prefix="$"
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
        />

        <v-text-field
          v-model="product.tags"
          label="Etiquetas (separadas por comas)"
          placeholder="tag1, tag2, tag3"
          variant="outlined"
          density="comfortable"
        />

        <div class="image-upload">
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
            max-height="128"
            contain
          />
        </div>

        <div class="form-actions">
          <v-btn
            color="grey"
            variant="outlined"
            @click="$router.push({ name: 'home' })"
            class="action-button"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="isLoading"
            class="action-button"
          >
            Actualizar Producto
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from '@/plugins/axios';
import SuccessMessage from "@/generalComponents/AlertMessage/SuccessMessage.vue";
import ErrorMessage from "@/generalComponents/AlertMessage/ErrorMessage.vue";
import SidebarView from "@/generalComponents/Sidebar/View/SidebarView.vue";

const route = useRoute();
const product = ref({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  categoryId: "",
  tags: "",
});
const selectedImage = ref(null);
const categories = ref([]);
const isLoading = ref(false);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);

const fetchCategories = async () => {
  try {
    const response = await api.get("/category");
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const fetchProduct = async () => {
  const productId = route.params.productId;
  try {
    const response = await api.get(`/product/${productId}`);
    product.value = response.data;
    selectedImage.value = response.data.image;
  } catch (error) {
    showErrorMessage.value = true;
    console.error("Error fetching product:", error);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedImage.value = file;
  } else {
    selectedImage.value = null;
  }
};

const imagePreview = computed(() => {
  if (selectedImage.value instanceof File) {
    return URL.createObjectURL(selectedImage.value);
  }
  if (selectedImage.value) {
    return `data:image/jpeg;base64,${selectedImage.value}`;
  }
  return null;
});

const updateProduct = async () => {
  const productId = route.params.productId;
  try {
    isLoading.value = true;
    showSuccessMessage.value = false;
    showErrorMessage.value = false;

    const formData = new FormData();
    const updatedProductData = {
      id: product.value.id,
      name: product.value.name,
      description: product.value.description,
      price: product.value.price,
      stock: product.value.stock,
      categoryId: product.value.categoryId,
      tags: product.value.tags,
    };
    formData.append("product", JSON.stringify(updatedProductData));
    if (selectedImage.value instanceof File) {
      formData.append("image", selectedImage.value);
    }

    const response = await api.put(
      `/product/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status === 200) {
      showSuccessMessage.value = true;
    }
  } catch (error) {
    showErrorMessage.value = true;
    console.error("Error updating product:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
  fetchProduct();
});
</script>

<style scoped>
.update-product-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(to top, #3A5199, #f3f4f6);
}

.message-card,
.form-card {
  width: 100%;
  max-width: 600px;
}

.form-header {
  background: linear-gradient(to right, #3b82f6, #4f46e5);
  color: white;
  text-align: center;
  padding: 1.5rem;
}

.form-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-upload {
  margin: 1rem 0;
}

.image-preview {
  margin-top: 1rem;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-button {
  flex: 1;
}
</style>
