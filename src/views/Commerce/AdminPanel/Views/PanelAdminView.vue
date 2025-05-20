<template>
  <v-app>
    <HeaderView />
    <v-navigation-drawer
      permanent
      location="left"
      class="admin-sidebar"
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

    <v-main class="admin-main">
      <v-container>
        <component :is="selectedComponent" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import HeaderView from '@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue';
import UsersView from '@/views/Commerce/Users/View/UsersView.vue';
import LocationAdminView from '@/views/Commerce/LocationAdmin/View/LocationAdminView.vue';

const selectedComponent = ref(null);

const menuItems = [
  { title: 'Usuarios', icon: 'mdi-account-group', component: UsersView },
  { title: 'Roles', icon: 'mdi-shield-account', component: null },
  { title: 'Locaciones', icon: 'mdi-map-marker', component: LocationAdminView },
  { title: 'Categorías', icon: 'mdi-view-list', component: null }
];


const selectComponent = (component) => {
  selectedComponent.value = component;
};
</script>

<style scoped>
.admin-sidebar {
  width: 320px;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  margin-top: 140px;
}

.menu-item {
  margin: 8px 0;
  border-radius: 8px;
}

.menu-item:hover {
  background-color: #e0e0e0;
}

.admin-main {
  margin-top: 140px;
  margin-left: 320px;
  padding: 24px;
}

@media (max-width: 1024px) {
  .admin-sidebar {
    width: 280px;
  }
  
  .admin-main {
    margin-left: 280px;
  }
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 240px;
  }
  
  .admin-main {
    margin-left: 240px;
  }
}

@media (max-width: 480px) {
  .admin-sidebar {
    width: 200px;
  }
  
  .admin-main {
    margin-left: 200px;
  }
}
</style>