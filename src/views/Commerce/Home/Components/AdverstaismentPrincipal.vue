<template>
  <div class="adverstaisment-principal">
    <h2>Productos de tu interes</h2>

    <div class="ad-cards">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="ad-card"
      >
        <img
          v-if="product.image"
          :src="getImageSrc(product.image)"
          alt="Imagen del producto"
        />
        <div class="info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p><strong>${{ product.price.toLocaleString() }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

// Construye el src completo si la imagen es base64
const getImageSrc = (image) => {
  // Si ya tiene el prefijo, devolver tal cual
  if (image.startsWith('data:image')) return image;

  // Si no, asumir que es base64 de tipo PNG
  return `data:image/png;base64,${image}`;
};
</script>

<style scoped>
.adverstaisment-principal {
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.ad-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.ad-card {
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9f9f9;
  transition: transform 0.2s ease;
}

.ad-card:hover {
  transform: scale(1.02);
}

.ad-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.info {
  padding: 0.5rem;
}
</style>
