<template>
  <v-card class="payment-summary">
    <v-card-title class="summary-header">
      <h2 class="summary-title">Resumen de tu Pedido</h2>
    </v-card-title>

    <v-card-text class="products-list">
      <v-list class="custom-scroll">
        <v-list-item
          v-for="product in products"
          :key="product.id"
          class="product-item"
          @click="viewProductDetails(product.id)"
        >
          <template v-slot:prepend>
            <v-img
              :src="`data:image/jpeg;base64,${product.image}`"
              alt="Imagen del producto"
              class="product-image"
              cover
            />
          </template>

          <v-list-item-title class="product-name">
            {{ product.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="product-description">
            {{ product.description }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <div class="product-details">
              <span class="product-quantity">X{{ product.stock }}</span>
              <span class="product-price">${{ product.price }}</span>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions class="total-section">
      <span class="total-label">TOTAL</span>
      <span class="total-amount">${{ calcularTotal() }}</span>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/plugins/axios';

const products = ref([]);
const router = useRouter();

const fetchProducts = async () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  try {
    const productPromises = cart.map(async (cartItem) => {
      const response = await api.get(`/product/${cartItem.id}`);
      return {
        ...cartItem,
        stock: response.data.stock,
        description: response.data.description,
        image: response.data.image,
      };
    });
    products.value = await Promise.all(productPromises);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

const calcularTotal = () => {
  return products.value.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0).toFixed(2);
};

const viewProductDetails = (productId) => {
  router.push(`/productDetailPage/${productId}`);
};

const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(products.value));
};

watch(products, updateCart, { deep: true });

window.addEventListener('storage', () => {
  fetchProducts();
});

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.payment-summary {
  background-color: #f5f5f5;
  margin-top: 8px;
  border-radius: 8px;
}

.summary-header {
  padding: 16px;
}

.summary-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.products-list {
  padding: 0;
  max-height: 460px;
  overflow-y: auto;
}

.product-item {
  border-top: 1px solid #D5D6D2;
  border-bottom: 1px solid #D5D6D2;
  padding: 16px;
  cursor: pointer;
}

.product-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 16px;
}

.product-name {
  font-size: 0.875rem;
  color: #1f2937;
  margin-bottom: 4px;
}

.product-description {
  font-size: 0.875rem;
  color: #4b5563;
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.product-quantity {
  font-size: 1rem;
  font-weight: 700;
  color: #2F2E33;
}

.product-price {
  font-size: 1.125rem;
  color: #2F2E33;
}

.total-section {
  background-color: #D5D6D2;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2F2E33;
}

.total-amount {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2F2E33;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.custom-scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}
</style>
  