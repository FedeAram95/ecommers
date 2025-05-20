<template>
  <v-app>
    <HeaderView />
    <v-main class="cart-page">
      <v-container class="cart-container">
        <v-card class="cart-card">
          <v-row>
            <v-col cols="12" md="8">
              <div class="cart-header">
                <h2 class="cart-title">Tu Carrito de Compras</h2>
              </div>
              
              <div v-if="cartProducts.length > 0" class="cart-items">
                <v-card
                  v-for="product in cartProducts"
                  :key="product.id"
                  class="product-card"
                >
                  <v-row align="center">
                    <v-col cols="auto">
                      <v-img
                        :src="`data:image/jpeg;base64,${product.image}`"
                        alt="Imagen del producto"
                        class="product-image"
                        cover
                      />
                    </v-col>
                    
                    <v-col>
                      <h3 class="product-name">{{ product.name }}</h3>
                      <p class="product-price">
                        Precio: <span class="price-value">${{ product.price }}</span>
                      </p>
                    </v-col>
                    
                    <v-col cols="auto">
                      <div class="quantity-controls">
                        <v-btn
                          @click="decreaseQuantity(product.id)"
                          variant="text"
                          class="quantity-btn"
                        >-</v-btn>
                        <v-text-field
                          v-model="product.quantity"
                          @change="updateCart(product)"
                          type="number"
                          min="1"
                          class="quantity-input"
                          hide-details
                          density="compact"
                        />
                        <v-btn
                          @click="increaseQuantity(product.id)"
                          variant="text"
                          class="quantity-btn"
                        >+</v-btn>
                      </div>
                    </v-col>
                    
                    <v-col cols="auto">
                      <p class="subtotal">${{ product.subtotal }}</p>
                    </v-col>
                    
                    <v-col cols="auto">
                      <v-btn
                        @click="removeProduct(product.id)"
                        class="remove-btn"
                        variant="text"
                        color="error"
                      >
                        <v-icon>mdi-delete</v-icon>
                        Eliminar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
              
              <div v-else class="empty-cart">
                <p>No tienes productos en tu carrito.</p>
              </div>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card class="summary-card">
                <v-card-title class="summary-title">
                  Resumen de compra
                </v-card-title>
                
                <v-card-text>
                  <div class="total-section">
                    <span>Total:</span>
                    <span class="total-amount">${{ totalAmount }}</span>
                  </div>
                  
                  <v-btn
                    @click="simulatePurchase"
                    :disabled="isFinish || cartProducts.length === 0"
                    color="#3A5199"
                    class="checkout-btn"
                    block
                  >
                    <v-progress-circular
                      v-if="isFinish"
                      indeterminate
                      color="white"
                      size="20"
                      width="2"
                      class="mr-2"
                    />
                    {{ isFinish ? 'Finalizando...' : 'Finalizar compra' }}
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      
      <SuccessMessage
        v-if="showSuccessMessage"
        message="¡Compra realizada con éxito!"
      />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderView from "@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue";
import SuccessMessage from "@/generalComponents/AlertMessage/SuccessMessage.vue";

const router = useRouter();
const cartProducts = ref([]);
const showSuccessMessage = ref(false);
const isFinish = ref(false);

const totalAmount = computed(() => {
  return cartProducts.value.reduce((total, product) => total + product.subtotal, 0);
});

const loadCart = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cartProducts.value = storedCart;
  cartProducts.value.forEach(product => {
    product.subtotal = product.price * product.quantity;
  });
};

const increaseQuantity = (productId) => {
  const product = cartProducts.value.find(p => p.id === productId);
  if (product) {
    if (product.quantity < product.stock) {
      product.quantity++;
      updateCart(product);
    } else {
      alert('No puedes agregar más unidades de este producto. Stock limitado.');
    }
  }
};

const decreaseQuantity = (productId) => {
  const product = cartProducts.value.find(p => p.id === productId);
  if (product && product.quantity > 1) {
    product.quantity--;
    updateCart(product);
  }
};

const updateCart = (product) => {
  product.subtotal = product.price * product.quantity;
  localStorage.setItem("cart", JSON.stringify(cartProducts.value));
  window.location.reload();
};

const removeProduct = (productId) => {
  cartProducts.value = cartProducts.value.filter(p => p.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cartProducts.value));
  window.location.reload();
};

const simulatePurchase = () => {
  if (cartProducts.value.length === 0) {
    alert("No tienes productos en el carrito para finalizar la compra.");
    return;
  }
  
  isFinish.value = true;

  setTimeout(() => {
    isFinish.value = false;
    router.push({ name: "Payment" });
  }, 1000);
};

onMounted(() => {
  loadCart();
});
</script>

<style scoped>
.cart-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 190px;
}

.cart-container {
  max-width: 1200px;
}

.cart-card {
  padding: 24px;
}

.cart-header {
  margin-bottom: 24px;
}

.cart-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-card {
  padding: 16px;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 96px;
  height: 96px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.product-price {
  color: #666;
}

.price-value {
  font-weight: 500;
  color: #1a1a1a;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-btn {
  min-width: 36px;
  padding: 0;
}

.quantity-input {
  width: 48px;
}

.subtotal {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.remove-btn {
  transition: transform 0.2s;
}

.remove-btn:hover {
  transform: scale(1.05);
}

.empty-cart {
  text-align: center;
  color: #666;
  font-size: 1.125rem;
  padding: 32px;
}

.summary-card {
  position: sticky;
  top: 144px;
  background-color: #fafafa;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  color: #1a1a1a;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
}

.total-amount {
  font-weight: 700;
}

.checkout-btn {
  margin-top: 16px;
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
}
</style>
  
  