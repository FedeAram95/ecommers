<template>
  <v-app>
    <SidebarView @sidebar-hover="handleSidebarHover" />
    
    <v-main
      class="add-product-page"
      :class="{ 'sidebar-expanded': isSidebarExpanded, 'sidebar-collapsed': !isSidebarExpanded }"
    >
      <v-container class="add-product-container">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <ProductView mode="create" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import SidebarView from "@/views/Commerce/ComponentsCommerce/Sidebar/View/SidebarView.vue";
import ProductView from "@/views/Commerce/Product/ProductView.vue";

const isSidebarExpanded = ref(false);

const handleSidebarHover = (isHovered) => {
  isSidebarExpanded.value = isHovered;
};
</script>

<style scoped>
.add-product-page {
  background: linear-gradient(to top, #3A5199, #f3f4f6);
  min-height: 100vh;
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-expanded {
  margin-left: 208px;
}

.sidebar-collapsed {
  margin-left: 64px;
}

.add-product-container {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
</style>