<template>
  <div v-if="visibleProducts.length > 0" class="carousel-wrapper">
    <h2 class="carousel-title">{{ title }}</h2>

    <div class="carousel-container">
      <div class="carousel-items">
        <div
          v-for="(product, index) in visibleProducts"
          :key="index"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <img
            :src="getImageSrc(product.image)"
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: String,
  products: {
    type: Array
  },
});

const visibleItems = ref(4);

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

const availableProducts = computed(() => {
  console.log("Available products:", props.products);
  return props.products
    .filter(product =>
      `${product.name} ${product.description}`.toLowerCase().includes(props.title.toLowerCase())
    )
    .filter(product => product.stock > 0);
});

const visibleProducts = computed(() => {
  return availableProducts.value.slice(0, visibleItems.value);
});

const getImageSrc = (image) => {
  if (!image) return "";
  if (image.startsWith("data:image")) return image;
  return `data:image/jpeg;base64,${image}`;
};

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
</script>

<style scoped>
.carousel-wrapper {
  padding-top: 40px;
  margin-bottom: 40px;
}

.carousel-title {
  margin-bottom: 20px;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 32px;
}

.carousel-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;
}

.carousel-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 32px;
}

.product-card {
  width: 250px;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: scale(1.03);
}

.product-image {
  width: 100%;
  height: 128px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 16px;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1f2937;
}

.product-price {
  color: #4b5563;
  margin-bottom: 12px;
  font-size: 1rem;
}

.add-to-cart-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #2563eb;
}
</style>
