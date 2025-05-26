<template>
  <v-app>
    <HeaderView ref="headerRef" />
    <v-navigation-drawer
      permanent
      location="left"
      class="admin-sidebar"
      :style="sidebarStyle"
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :value="item"
          @click="selectComponent(item.component)"
          class="menu-item"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="admin-main" :style="mainStyle">
      <v-container class="main-container">
        <component :is="selectedComponent" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import HeaderView from '@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue';
import UsersView from '@/views/Commerce/Users/View/UsersView.vue';
import LocationAdminView from '@/views/Commerce/LocationAdmin/View/LocationAdminView.vue';
import CategoryProductsView from '@/views/Commerce/AdminPanel/Views/CategoryProductsView.vue';
import ProductsView from '@/views/Commerce/AdminPanel/Views/ProductsView.vue';

const selectedComponent = ref(null);
const headerRef = ref(null);
const sidebarStyle = ref({});
const mainStyle = ref({});

const menuItems = [
  { title: 'Categorías', icon: 'mdi-view-list', component: CategoryProductsView },
  { title: 'Productos', icon: 'mdi-package-variant', component: ProductsView }
];

const selectComponent = (component) => {
  selectedComponent.value = component;
};

const getSidebarWidth = (width) => {
  if (width <= 480) return 200;
  if (width <= 768) return 240;
  if (width <= 1024) return 280;
  return 320;
};

const updateOffsets = () => {
  if (headerRef.value) {
    const height = headerRef.value.$el
      ? headerRef.value.$el.offsetHeight
      : headerRef.value.offsetHeight;

    const windowWidth = window.innerWidth;
    const sidebarWidth = getSidebarWidth(windowWidth);

    sidebarStyle.value = { marginTop: `${height}px`, width: `${sidebarWidth}px` };
    mainStyle.value = {
      marginTop: `${height}px`,
      marginLeft: `${sidebarWidth}px`,
      padding: '24px'
    };
  }
};

onMounted(() => {
  updateOffsets();
  window.addEventListener('resize', updateOffsets);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateOffsets);
});
</script>

<style scoped>
.admin-sidebar {
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}

.menu-item {
  margin: 8px 0;
  border-radius: 8px;
}

.menu-item:hover {
  background-color: #e0e0e0;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
