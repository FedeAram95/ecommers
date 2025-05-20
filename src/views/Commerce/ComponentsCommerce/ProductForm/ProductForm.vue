<template>
  <div class="product-form">
    <v-card v-if="showSuccessMessage" class="success-message">
      <SuccessMessage />
    </v-card>
    <v-card v-else-if="showErrorMessage" class="error-message">
      <ErrorMessage />
    </v-card>
    <v-card v-else class="form-card">
      <v-card-title
        class="form-header"
        :class="{
          'edit-mode': mode === 'edit',
          'create-mode': mode === 'create'
        }"
      >
        {{ mode === "edit" ? "Editar Producto" : "Crear Nuevo Producto" }}
      </v-card-title>

      <v-form @submit.prevent="submitForm" class="form-content">
        <v-text-field
          v-model="formData.name"
          label="Nombre del Producto"
          required
          variant="outlined"
          density="comfortable"
        />

        <v-textarea
          v-model="formData.description"
          label="Descripción"
          required
          variant="outlined"
          rows="3"
          density="comfortable"
        />

        <v-text-field
          v-model="formData.price"
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
          v-model="formData.stock"
          label="Stock"
          type="number"
          min="0"
          required
          variant="outlined"
          density="comfortable"
        />

        <v-select
          v-model="formData.categoryId"
          :items="categories"
          item-title="description"
          item-value="id"
          label="Categoría"
          required
          variant="outlined"
          density="comfortable"
        />

        <v-text-field
          v-model="formData.tags"
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
            @click="cancel"
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
            {{ mode === "edit" ? "Actualizar" : "Crear" }}
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import api from '@/plugins/axios';
import SuccessMessage from "@/generalComponents/AlertMessage/SuccessMessage.vue";
import ErrorMessage from "@/generalComponents/AlertMessage/ErrorMessage.vue";

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value) => ["create", "edit"].includes(value),
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const formData = ref({
  name: props.initialData?.name || "",
  description: props.initialData?.description || "",
  price: props.initialData?.price || 0,
  stock: props.initialData?.stock || 0,
  categoryId: props.initialData?.categoryId || "",
  tags: props.initialData?.tags || "",
});

const categories = ref([]);
const selectedImage = ref(props.initialData?.image || null);
const isLoading = ref(false);
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);

const imagePreview = computed(() => {
  if (selectedImage.value instanceof File) {
    return URL.createObjectURL(selectedImage.value);
  }
  return selectedImage.value;
});

const fetchCategories = async () => {
  try {
    const response = await api.get("api/category");
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 3 * 1024 * 1024) {
      alert("La imagen no debe exceder los 3MB");
      return;
    }
    selectedImage.value = file;
  }
};

const submitForm = async () => {
  isLoading.value = true;
  try {
    const formDataToSend = new FormData();
    Object.keys(formData.value).forEach((key) => {
      formDataToSend.append(key, formData.value[key]);
    });
    if (selectedImage.value) {
      formDataToSend.append("image", selectedImage.value);
    }

    if (props.mode === "create") {
      await api.post("api/product", formDataToSend);
    } else {
      await api.put(`api/product/${props.initialData.id}`, formDataToSend);
    }

    showSuccessMessage.value = true;
  } catch (error) {
    console.error("Error submitting form:", error);
    showErrorMessage.value = true;
  } finally {
    isLoading.value = false;
  }
};
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        name: newData.name || "",
        description: newData.description || "",
        price: newData.price || 0,
        stock: newData.stock || 0,
        categoryId: newData.categoryId || "",
        tags: newData.tags || "",
      };
      selectedImage.value = newData.image || null;
    }
  },
  { deep: true }
);

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.product-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form-card {
  overflow: hidden;
}

.form-header {
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.edit-mode {
  background: linear-gradient(to right, #3b82f6, #4f46e5);
}

.create-mode {
  background: linear-gradient(to right, #10b981, #0d9488);
}

.form-content {
  padding: 1.5rem;
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

.success-message,
.error-message {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>