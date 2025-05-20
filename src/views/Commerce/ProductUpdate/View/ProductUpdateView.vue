<template>
  <div class="product-update-container">
    <SidebarView @sidebar-hover="handleSidebarHover" />

    <v-main
      class="main-content"
      :class="{ 'sidebar-expanded': isSidebarExpanded, 'sidebar-collapsed': !isSidebarExpanded }"
    >
      <v-container class="content-wrapper">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card v-if="productData" class="product-card">
              <ProductView mode="edit" :initialData="productData" />
            </v-card>
            <v-card v-else class="loading-card">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              />
              <span class="loading-text">Cargando...</span>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from '@/plugins/axios';
import ProductView from "@/views/Commerce/Product/ProductView.vue";
import SidebarView from "@/generalComponents/Sidebar/View/SidebarView.vue";

const route = useRoute();
const productData = ref(null);
const isSidebarExpanded = ref(false);

const handleSidebarHover = (isHovered) => {
  isSidebarExpanded.value = isHovered;
};

const fetchProduct = async () => {
  try {
    const response = await api.get(`/product/${route.params.productId}`);
    productData.value = response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.product-update-container {
  min-height: 100vh;
  background: linear-gradient(to top, #3A5199, #f3f4f6);
}

.main-content {
  transition: all 0.3s ease-in-out;
}

.sidebar-expanded {
  margin-left: 208px;
}

.sidebar-collapsed {
  margin-left: 64px;
}

.content-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.product-card {
  width: 100%;
}

.loading-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
}

.loading-text {
  font-size: 1.1rem;
  color: #666;
}

@media (max-width: 960px) {
  .sidebar-expanded,
  .sidebar-collapsed {
    margin-left: 0;
  }
}
</style>