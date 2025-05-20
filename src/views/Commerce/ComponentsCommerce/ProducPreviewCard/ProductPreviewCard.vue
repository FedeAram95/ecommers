<template>
    <div class="product-preview">
        <div class="product-content">
            <div class="product-image-container">
                <img
                    :src="getImageUrl(product.image)"
                    alt="Imagen del producto"
                    class="product-image"
                />
            </div>
    
            <div class="product-details">
                <h2 class="product-name">
                    {{ product.name || 'Nombre del producto' }}
                </h2>
    
                <p class="product-price">
                    $ {{ product.price || 0 }}
                </p>
    
                <div class="quantity-controls">
                    <div class="quantity-input">
                        <button
                            class="quantity-button"
                            disabled
                        >
                            -
                        </button>
                        <input
                            type="number"
                            v-model="quantity"
                            class="quantity-field"
                            readonly
                        />
                        <button
                            class="quantity-button"
                            disabled
                        >
                            +
                        </button>
                    </div>
                    <p class="stock-info">
                        ({{ product.stock || 0 }} disponibles)
                    </p>
                </div>

                <div class="action-buttons">
                    <button
                        class="add-to-cart-button"
                    >
                        Agregar al carrito
                    </button>
                    <button
                        class="buy-now-button"
                    >
                        Comprar ahora
                    </button>
                </div>
            </div>
        </div>

        <div class="product-description">
            <h3 class="description-title">Descripción del producto</h3>
            <p class="description-text">
                {{ product.description || 'Descripción del producto' }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref} from 'vue';

const props = defineProps({
    product: {
        type: Object,
        default: () => ({
            name: "Nombre del producto",
            image: "https://via.placeholder.com/400",
            description: "Descripción del producto",
            price: 99.99,
            stock: 10,
        }),
    },
});

const quantity = ref(1);

const getImageUrl = (image) => {
    if (image instanceof File) {
        return URL.createObjectURL(image);
    }
    if (image) {
        return `data:image/jpeg;base64,${image}`;
    }
    return "https://via.placeholder.com/400";
};
</script>

<style scoped>
.product-preview {
    margin: auto;
    width: 100%;
    border-radius: 0.5rem;
    background-color: white;
    padding: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.product-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .product-content {
        flex-direction: row;
    }
}

.product-image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: #f3f4f6;
    padding: 1rem;
}

@media (min-width: 768px) {
    .product-image-container {
        width: 50%;
    }
}

.product-image {
    max-height: 24rem;
    width: 100%;
    object-fit: contain;
}

.product-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
    padding: 0.5rem;
    font-family: sans-serif;
}

@media (min-width: 768px) {
    .product-details {
        width: 50%;
    }
}

.product-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    min-width: 0;
}

.product-price {
    margin-top: 1rem;
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
}

.quantity-controls {
    margin-top: 1.25rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
}

.quantity-input {
    display: flex;
    align-items: center;
}

.quantity-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    padding: 0 0.75rem;
    height: 1.75rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 0.5rem 0 0 0.5rem;
    cursor: not-allowed;
}

.quantity-field {
    width: 3rem;
    height: 1.75rem;
    background-color: #f3f4f6;
    text-align: center;
    border-top: 1px solid #d1d5db;
    border-bottom: 1px solid #d1d5db;
}

.stock-info {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    color: #4b5563;
}

.action-buttons {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
}

@media (min-width: 640px) {
    .action-buttons {
        flex-direction: row;
        gap: 0.5rem;
    }
}

.add-to-cart-button {
    font-family: sans-serif;
    width: 100%;
    padding: 0.75rem 1rem;
    font-weight: 600;
    border-radius: 0.75rem;
    position: relative;
    box-shadow: inset 0 0 0 2px #3A5199;
    color: #3A5199;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-to-cart-button:hover {
    background-color: rgba(58, 81, 153, 0.1);
}

.buy-now-button {
    font-family: sans-serif;
    width: 100%;
    padding: 0.75rem 1rem;
    color: white;
    font-weight: 600;
    border-radius: 0.75rem;
    position: relative;
    background-color: #3A5199;
    cursor: pointer;
    transition: background-color 0.2s;
}

.buy-now-button:hover {
    background-color: #2c3e7a;
}

.product-description {
    margin-top: 1.5rem;
    width: 100%;
    border-radius: 0.5rem;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    padding: 1rem;
}

.description-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
}

.description-text {
    margin-top: 0.5rem;
    color: #4b5563;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    min-width: 0;
}
</style>