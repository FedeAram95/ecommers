<template>
    <div class="product-container">
        <div class="product-grid">
            <ProductForm
                :mode="mode"
                :initialData="formData"
                @update:modelValue="handleFormUpdate"
                />

            <ProductPreviewCard :product="formData" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import ProductForm from "@/views/Commerce/ComponentsCommerce/ProductForm/ProductForm.vue";
import ProductPreviewCard from "@/views/Commerce/ComponentsCommerce/ProducPreviewCard/ProductPreviewCard.vue";

const props = defineProps({
    mode: {
        type: String,
        required: true,
        validator: (value) => ["create", "edit"].includes(value),
    },
    initialData: {
        type: Object,
        default: () => ({}),
    },
});

const formData = ref({ ...props.initialData });

const handleFormUpdate = (newData) => {
    formData.value = { ...newData };
};

</script>

<style scoped>
.product-container {
    margin: 0 auto;
    padding: 1.5rem;
    width: 100%;
    max-width: 1200px;
}

.product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>