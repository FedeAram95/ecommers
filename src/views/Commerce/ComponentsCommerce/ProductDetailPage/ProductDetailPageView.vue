<template>
  <HeaderView />
  <SidebarView />
  <v-container class="product-detail-container">
    <v-card class="product-detail-wrapper">
      <v-row class="product-detail-content">
        <v-col cols="12" md="6" class="product-image-section">
          <v-btn
            @click="goBack"
            color="primary"
            variant="text"
            class="back-button"
          >
            <v-icon>mdi-arrow-left</v-icon>
            Volver
          </v-btn>
          <v-img
            :src="`data:image/jpeg;base64,${product.image}`"
            alt="Imagen del producto"
            class="product-image"
            contain
          />
        </v-col>

        <v-col cols="12" md="6" class="product-info-section">
          <h2 class="product-name">
            {{ product.name }}
          </h2>
          <p class="product-description">
            {{ product.description }}
            <v-icon color="success" size="small">mdi-check-circle</v-icon>
          </p>

          <p class="product-price">
            $ {{ product.price }}
          </p>
          
          <div class="quantity-section">
            <div class="quantity-controls">
              <v-btn
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
                variant="outlined"
                class="quantity-button"
              >
                -
              </v-btn>
              <v-text-field
                v-model="quantity"
                type="number"
                density="compact"
                variant="outlined"
                class="quantity-input"
                hide-details
              />
              <v-btn
                @click="increaseQuantity"
                :disabled="quantity >= product.stock"
                variant="outlined"
                class="quantity-button"
              >
                +
              </v-btn>
            </div>
            <p class="stock-info">
              ({{ product.stock }} disponibles)
            </p>
          </div>

          <div class="action-buttons">
            <v-btn
              @click="addToCart"
              :loading="isLoading"
              color="primary"
              class="add-to-cart-button"
              block
            >
              Agregar al carrito
            </v-btn>
            <v-btn
              @click="buyNow"
              :loading="isLoadingBuyNow"
              color="success"
              class="buy-now-button"
              block
            >
              Comprar ahora
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import HeaderView from "@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue";
import SidebarView from "@/views/Commerce/ComponentsCommerce/Sidebar/View/SidebarView.vue";
import api from '@/plugins/axios';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const router = useRouter();
const product = ref({
  name: "",
  image: "",
  description: "",
  stock: 0,
  price: 0,
});
const quantity = ref(1);
const isLoading = ref(false);
const isLoadingBuyNow = ref(false);

const fetchProduct = async () => {
  try {
    const response = await api.get(`/product/${props.id}`);
    product.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const goBack = () => {
  router.go(-1);
};

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++;
  } else {
    alert("No puedes agregar más unidades, has alcanzado el stock máximo.");
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  isLoading.value = true;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItem = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    quantity: quantity.value,
    image: product.value.image,
  };

  const existingProductIndex = cart.findIndex(item => item.id === cartItem.id);
  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity += quantity.value;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  setTimeout(() => {
    isLoading.value = false;
    router.push({ name: "home" });
  }, 1000);
};

const buyNow = () => {
  isLoadingBuyNow.value = true;

  const newCart = [{
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    quantity: quantity.value,
    image: product.value.image,
  }];

  localStorage.setItem("cart", JSON.stringify(newCart));

  setTimeout(() => {
    isLoadingBuyNow.value = false;
    router.push({ name: "Payment" });
  }, 1000);
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.product-detail-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-detail-wrapper {
  padding: 2rem;
}

.product-detail-content {
  display: flex;
  gap: 2rem;
}

.product-image-section {
  position: relative;
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
}

.product-image {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
}

.product-info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-name {
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a1a;
}

.product-description {
  font-size: 1.1rem;
  color: #4a4a4a;
  line-height: 1.6;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
}

.quantity-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-button {
  min-width: 40px;
  padding: 0;
}

.quantity-input {
  max-width: 80px;
}

.stock-info {
  color: #666;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 960px) {
  .product-detail-content {
    flex-direction: column;
  }

  .product-image {
    max-height: 300px;
  }
}
</style>
