<template>
  <div class="product-list-main">
    <div class="product-list-container">
      <h3 class="product-list-title">
        {{ route.params?.subcategory ? route.params?.subcategory + ' / ' : '' }}
        <span v-if="selectedCategory && selectedCategory?.description">
           {{ selectedCategory?.description }}
        </span>
      </h3>

      <div v-if="loading" class="product-grid">
        <SkeletonCard v-for="index in 10" :key="index" />
      </div>
      <div v-else class="product-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :activeDropdown="activeDropdown"
          @setActiveDropdown="setActiveDropdown"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/plugins/axios';
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import ProductCard from "./ProductCard.vue";
import SkeletonCard from "./SkeletonCard.vue";

const products = ref([]);
const filteredProducts = ref([]);
const selectedCategory = ref(null);
const loading = ref(true);
const route = useRoute();
const activeDropdown = ref(null);

const setActiveDropdown = (id) => {
  activeDropdown.value = id === activeDropdown.value ? null : id;
};

const synonyms = {
  celulares: ["celular"],
  cocinas: ["cocina"],
  autos: ["auto", "vehiculo"],
  moto: ["honda"],
  televisores: ["televisor"],
  heladeras: ["heladera"],
  aire: ["aire acondicionado"],
  lavarropas: ["lavarropa"],
  camiones: ["camion"],
  computacion: ["computadora", "notebook", "teclado", "gabinete"],
  video: ["camara"],
  audio: ["audio", "parlante", "auriculares"],
  nautica: ["nautica", "crucero", "lancha"],
};

const normalizeTag = (tag) => {
  const normalizedTag = tag.toLowerCase();
  for (const key in synonyms) {
    if (synonyms[key].includes(normalizedTag)) {
      return key;
    }
  }
  return normalizedTag;
};

const fetchCategory = async () => {
  if (!route.params.category) {
    selectedCategory.value = null;
    return;
  }

  try {
    const response = await api.get(
      `/category/${route.params.category}`,
    );
    selectedCategory.value = response.data;
  } catch (error) {
    selectedCategory.value = null;
    console.error(error);
  }
};

const applyFilter = () => {
  const queryTags = route.query.tags
    ? route.query.tags
        .toLowerCase()
        .split(",")
        .map((t) => normalizeTag(t))
    : null;

  const queryCategoryId = parseInt(route.params.category);

  filteredProducts.value = products.value.filter((product) => {
    let isCategoryMatch = true;
    let isTagMatch = true;

    if (queryCategoryId) {
      isCategoryMatch = product.categoryId === queryCategoryId;
    }

    if (!queryCategoryId && queryTags) {
      const productTags = product.tags
        .toLowerCase()
        .split(",")
        .map((t) => normalizeTag(t));
      isTagMatch = queryTags.every((tag) => productTags.includes(tag));
    }

    return isCategoryMatch && isTagMatch;
  });
};

const fetchProducts = async () => {
  loading.value = true;
  try {
    let url = "/product";
    if (route.params.category) {
      url += `?category=${route.params.category}`;
    }
    if (route.params.subcategory) {
      url += `&subcategory=${route.params.subcategory}`;
    }
    const response = await api.get(url);
    products.value = response.data;
    applyFilter();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
  fetchCategory();
});

watch(() => route.params.category, fetchCategory);
watch(() => route.params, fetchProducts, { immediate: true });
watch(() => route.query.tags, applyFilter);
</script>

<style scoped>
.product-list-main {
  margin: 0 auto;
  padding-top: 11rem;
  padding: 1rem;
  min-height: 100%;
  background-color: #f1f5f9;
}

.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
}

.product-list-title {
  margin-bottom: 0.75rem;
  text-align: start;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
