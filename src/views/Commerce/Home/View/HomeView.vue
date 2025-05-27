<template>
  <div>
    <HeaderView />

    <template v-if="userRole !== null">
      <SideBarView v-if="userRole === 'SELLER'" />

      <div v-if="showLoader" class="loader-wrapper">
        <LoaderView class="loader-view" />
      </div>

      <div v-else class="home-container">
        <!-- Publicidad principal -->
        <AdverstaismentPrincipal 
          v-if="allProducts.length > 0"
          :products="allProducts"
        />

        <!-- Carruseles por tipo de producto -->
        <section
          v-for="(typeProducts, index) in allProducts"
          :key="index"
          class="carousel-section"
        >
          <CarouselProduct
            :products="allProducts"
            :title="typeProducts.name"
          />
        </section>
      </div>

      <FooterView />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/store';
import api from '@/plugins/axios';
import CarouselProduct from "@/views/Commerce/Home/Components/CarouselProduct.vue";
import AdverstaismentPrincipal from "@/views/Commerce/Home/Components/AdverstaismentPrincipal.vue";
import HeaderView from "@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue";
import SideBarView from "@/views/Commerce/ComponentsCommerce/Sidebar/View/SidebarView.vue";
import FooterView from "@/views/Commerce/ComponentsCommerce/Footer/View/FooterView.vue";
import LoaderView from "@/generalComponents/Loader/LoaderView.vue";

const store = useUserStore();
const userRole = computed(() => store.getUserRole);
const randomCategoryTypeProducts = ref([]);
const categoriesWithTypes = ref([]);
const allProducts = ref([]);
const showLoader = ref(false);

const getRandomTypes = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const fetchProductsAndTypes = async () => {
  try {
    showLoader.value = true;
    const [productsRes, categoriesRes, typesRes] = await Promise.all([
      api.get("/product"),
      api.get("/category"),
      api.get("/categoryTypes"),
    ]);

    allProducts.value = Array.isArray(productsRes.data) ? productsRes.data : [];

    const categories = categoriesRes.data;
    const typesData = typesRes.data;

    categoriesWithTypes.value = categories.map((category) => {
      const matchingType = typesData.find(
        (type) => type.description === category.description
      );
      return {
        ...category,
        types: matchingType ? matchingType.typesDtoList : [],
      };
    });

    const categoryTypeProductsMapped = categoriesWithTypes.value.flatMap((category) =>
      (category.types || []).map((type) => {
        const availableProducts = allProducts.value.filter(
          (product) => product.typeId === type.id && product.stock > 0
        );
        return {
          title: type.description,
          allProducts: availableProducts,
        };
      })
    ).filter(item => item.allProducts.length > 0);

    randomCategoryTypeProducts.value = getRandomTypes(categoryTypeProductsMapped, 5);
    showLoader.value = false;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    showLoader.value = false;
  }
};

onMounted(async () => {
  await fetchProductsAndTypes();
});
</script>

<style scoped>
.home-container {
  margin: 8rem auto 0 auto;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  padding: 1rem 2rem;
  background-color: #f1f5f9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.carousel-section {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .home-container {
    margin-top: 6rem;
    padding: 1rem;
  }
}
</style>
