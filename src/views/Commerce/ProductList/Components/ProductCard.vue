<template>
  <div class="product-card">
    <div class="product-actions">
      <MoreVertical
        v-if="shouldShowEditDropdown"
        color="#2668a6"
        class="dropdown-trigger"
        @click="toggleDropdown"
      />
      <div
        v-if="isDropdownVisible"
        class="dropdown-menu"
      >
        <ul class="dropdown-list">
          <li>
            <button
              class="dropdown-item"
              @click="router.push(`/productUpdate/${product.id}`)"
            >
              Editar Producto
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              @click="confirmDelete"
            >
              Eliminar Producto
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showMessage" class="message-overlay">
      <SuccessMessage
        :isSuccess="isSuccess"
        :message="messageText"
      />
    </div>
    <div class="product-content">
      <router-link
        v-if="canNavigateToProductDetail"
        :to="{ name: 'ProductDetailPageView', params: { id: product.id } }"
        class="product-link"
      >
        <img
          :src="'data:image/jpeg;base64,' + product.image"
          alt="Imagen del producto"
          class="product-image"
        />
        <h3 class="product-name">
          {{ product.name }}
        </h3>
        <p class="product-description">
          Por {{ product.description }}
        </p>
        <p class="product-price">
          $ {{ product.price.toFixed(2) }}
        </p>
      </router-link>
      <div v-else>
        <img
          :src="'data:image/jpeg;base64,' + product.image"
          alt="Imagen del producto"
          class="product-image"
        />
        <h3 class="product-name">
          {{ product.name }}
        </h3>
        <p class="product-description">
          Por {{ product.description }}
        </p>
        <p class="product-price">
          $ {{ product.price.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { MoreVertical} from "lucide-vue-next";
import { ref, computed, onMounted, onBeforeUnmount, defineProps, defineEmits } from "vue";
import api from '@/plugins/axios';
import SuccessMessage from "@/generalComponents/AlertMessage/SuccessMessage.vue";

const showMessage = ref(false);
const isSuccess = ref(false);
const messageText = ref("");

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      name: "Producto no especificado",
      brand: "Marca no especificada",
      price: 0,
      image: "",
    }),
  },
  activeDropdown: Number,
});

const router = useRouter();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const isDropdownVisible = computed(() => props.activeDropdown === props.product.id);

const shouldShowEditDropdown = computed(() => {
  const route = router.currentRoute.value;
  return !route.name.startsWith("CategoryProducts") && !route.name.startsWith("SubcategoryProducts");
});

const closeDropdown = (event) => {
  const dropdown = document.querySelector(".dropdown-menu");
  if (dropdown && !dropdown.contains(event.target) && !event.target.closest(".product-actions")) {
    isDropdownOpen.value = false;
  }
};

const confirmDelete = async () => {
  if (confirm("¿Estás seguro que deseas eliminar este producto?")) {
    try {
      const response = await api.delete(`api/product/${props.product.id}`);
      if (response.status === 200) {
        showMessage.value = true;
        isSuccess.value = true;
        messageText.value = "Producto eliminado con éxito.";
      }
    } catch (error) {
      showMessage.value = true;
      isSuccess.value = false;
      messageText.value = "Hubo un error al eliminar el producto.";
    }
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

const canNavigateToProductDetail = computed(() => {
  const route = router.currentRoute.value;
  return route.name.startsWith("CategoryProducts") || route.name.startsWith("SubcategoryProducts");
});
</script>

<style scoped>
.product-card {
  position: relative;
  max-width: 20rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid #1f2937;
  background-color: white;
  padding: 1rem;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.product-actions {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 10rem;
  border-radius: 0.375rem;
  background-color: #d1d5db;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  z-index: 10;
}

.dropdown-list {
  padding: 0.25rem 0;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #1e293b;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #9ca3af;
}

.message-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.product-content {
  margin-top: 1rem;
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-image {
  height: 12rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: contain;
}

.product-name {
  margin-top: 0.5rem;
  text-align: start;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1f2937;
  cursor: pointer;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-name:hover {
  color: #3A5199;
}

.product-description {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  text-align: start;
  font-size: 0.75rem;
  color: #6b7280;
}

.badge-icon {
  margin-left: 0.25rem;
  color: #1e40af;
}

.product-price {
  text-align: start;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}
</style>