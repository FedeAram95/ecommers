<template>
  <div class="product-list-container">
    <div class="product-list-wrapper">
      <HeaderView />
      <div class="product-list-content">
        <SidebarView />
        <ProductList />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderView from "@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue";
import SidebarView from "@/views/Commerce/ComponentsCommerce/Sidebar/View/SidebarView.vue";
import ProductList from "@/views/Commerce/ProductList/Components/ProductList.vue";
</script>

<style scoped>
.product-list-container {
  min-height: 100vh;
  background-color: #f1f5f9;
}

.product-list-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.product-list-content {
  display: flex;
  flex: 1;
  margin-top: 200px;
}
</style>
