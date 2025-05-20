<template>
  <div
    v-if="availableProducts.length > 0"
    class="carousel-wrapper"
  >
    <h2 class="carousel-title">
      {{ title }}
    </h2>
    <div class="carousel-container">
      <div class="carousel-items">
        <div
          v-for="(product, index) in availableProducts"
          :key="index"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <img
            :src="`data:image/jpeg;base64,${product.image}`"
            :alt="product.name"
            class="product-image"
          />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">${{ product.price }}</p>
          <button
            @click.stop="addToCart(product)"
            class="add-to-cart-button"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted} from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: String,
  products: Array,
});

const visibleItems = ref(4);

const availableProducts = computed(() => {
  return props.products
    .filter(product =>
      `${product.name} ${product.description}`
        .toLowerCase()
        .includes(props.title.toLowerCase())
    )
    .filter(product => product.stock > 0)
    .slice(0, 4);
});

const goToProduct = (id) => {
  router.push({ name: "ProductDetailPageView", params: { id } });
};

const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

const updateVisibleItems = () => {
  if (window.innerWidth >= 1440) visibleItems.value = 4;
  else if (window.innerWidth >= 1024) visibleItems.value = 3;
  else if (window.innerWidth >= 768) visibleItems.value = 2;
  else visibleItems.value = 1;
};

onMounted(() => {
  updateVisibleItems();
  window.addEventListener("resize", updateVisibleItems);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateVisibleItems);
});
</script>

<style scoped>
.carousel-wrapper {
  margin-bottom: 10px;
  padding-top: 40px;
}

.carousel-title {
  margin-bottom: 20px;
  text-align: start;
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 32px;
}

.carousel-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 32px;
}

.carousel-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 40px;
}

.product-card {
  width: 250px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: start;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: scale(1.02);
}

.product-image {
  margin-bottom: 16px;
  height: 128px;
  width: 100%;
  border-radius: 6px;
  object-fit: contain;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.product-price {
  color: #374151;
  margin-bottom: 8px;
}

.add-to-cart-button {
  padding: 8px 12px;
  font-size: 0.875rem;
  color: white;
  background-color: #3B82F6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #2563EB;
}
</style>

