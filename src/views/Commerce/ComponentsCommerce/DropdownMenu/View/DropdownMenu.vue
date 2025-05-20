<template>
  <div
    class="dropdown-container"
    @mouseenter="openMenu"
    @mouseleave="scheduleCloseMenu"
  >
    <div class="dropdown-button-container">
      <v-btn variant="text" style="text-transform: none;"
        class="dropdown-button"
        >{{ "Categorías" }}
        <v-icon icon="mdi-chevron-down"></v-icon>
      </v-btn>
    </div>

    <div
      v-if="isOpen"
      class="dropdown-menu"
    >
      <div class="dropdown-content">
        <div
          v-for="category in categories"
          :key="category.id"
          class="dropdown-item"
          @mouseenter="category.types ? openSubcategory(category.id) : null"
          @mouseleave="category.types ? scheduleCloseSubcategory() : null"
        >
          <router-link
            :to="{
              name: 'CategoryProducts',
              params: { category: category.id },
            }"
            v-if="category.types.length > 0"
            class="category-link"
            @click="closeMenu"
          >
            {{ category.description }}
            <span class="arrow">></span>
          </router-link>
          <router-link
            v-else
            :to="{ query: { tags: category.description } }"
            class="category-link"
            @click="closeMenu"
          >
            {{ category.description }}
          </router-link>

          <div
            v-if="category.types.length > 0 && openSub === category.id"
            class="subcategory-menu"
            @mouseenter="clearSubcategoryClose"
            @mouseleave="scheduleCloseSubcategory"
          >
            <router-link
              v-for="type in category.types"
              :key="type.id"
              :to="{
                name: 'SubcategoryProducts',
                params: {
                  category: category.id,
                  subcategory: type.description,
                },
                query: { tags: type.description },
              }"
              class="subcategory-item"
              @click="closeMenu"
            >
              {{ type.description }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/plugins/axios';
import { useRoute } from "vue-router";
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const isOpen = ref(false);
const openSub = ref(null);
const closeTimeout = ref(null);
const subcategoryCloseTimeout = ref(null);
const categories = ref([]);
const route = useRoute();

const shouldShowEditDropdown = computed(() => {
  return !route.name.startsWith("CategoryProducts") && !route.name.startsWith("SubcategoryProducts");
});

const fetchData = async () => {
  try {
    const [vars] = await Promise.all([
      api.get("/categoryTypes"),
    ]);
    categories.value = vars.data.map((category) => ({
      id: category.id,
      description: category.description,
      types: category.typesDtoList || [],
    }));
  } catch (error) {
    return error;
  }
};

const openMenu = () => {
  isOpen.value = true;
  clearTimeout(closeTimeout.value);
};

const scheduleCloseMenu = () => {
  closeTimeout.value = setTimeout(() => {
    isOpen.value = false;
    openSub.value = null;
  }, 100);
};

const openSubcategory = (categoryId) => {
  openSub.value = categoryId;
  clearTimeout(subcategoryCloseTimeout.value);
};

const scheduleCloseSubcategory = () => {
  subcategoryCloseTimeout.value = setTimeout(() => {
    openSub.value = null;
  }, 100);
};

const clearSubcategoryClose = () => {
  clearTimeout(subcategoryCloseTimeout.value);
};

const closeMenu = () => {
  isOpen.value = false;
  openSub.value = null;
};

onMounted(() => {
  fetchData();
});

onBeforeUnmount(() => {
  clearTimeout(closeTimeout.value);
  clearTimeout(subcategoryCloseTimeout.value);
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
  text-align: left;
}

.dropdown-button-container {
  margin: 0;
  padding: 0;
}

.dropdown-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  color: white;
  text-align: center;
}

.dropdown-menu {
  position: absolute;
  left: 15px;
  width: 224px;
  transform-origin: top left;
  border-radius: 6px;
  background-color: #242424;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  outline: none;
}

.dropdown-content {
  padding: 4px 0;
}

.dropdown-item {
  position: relative;
  display: block;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 0.875rem;
  color: white;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #615e5e;
}

.category-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  text-decoration: none;
}

.arrow {
  margin-left: 8px;
}

.subcategory-menu {
  position: absolute;
  left: 100%;
  top: 0;
  margin-top: 0;
  width: 192px;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.subcategory-item {
  display: block;
  padding: 8px 16px;
  font-size: 0.875rem;
  color: #111827;
  text-decoration: none;
  transition: color 0.2s;
}

.subcategory-item:hover {
  color: #1e40af;
}
</style>
