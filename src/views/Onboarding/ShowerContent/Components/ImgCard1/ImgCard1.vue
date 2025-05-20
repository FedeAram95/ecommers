<template>
    <section class="section">
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="text">{{ text }}</p>
        <div class="image-container" v-if="img">
            <img :src="img" :alt="alt" @click="expandImage(img)" />
        </div>

        <div class="image-modal" v-if="expandedImage" @click="closeModal">
            <div class="modal-content">
                <img :src="expandedImage" alt="Imagen expandida" />
                <button class="close-button" @click="closeModal">×</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: { type: String, default: '' },
    text: { type: String, default: '' },
    img: { type: String, default: '' },
    alt: { type: String, default: '' }
})

const expandedImage = ref(null)

const expandImage = (image) => {
    expandedImage.value = image
}

const closeModal = () => {
    expandedImage.value = null
}
</script>

<style scoped lang="scss">
.section {
    border-radius: 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin: 5rem auto;
    max-width: 95%;
    background: #cafbff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: #000000;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    p {
        font-size: 1.1rem;
        color: rgba(0, 0, 0, 0.9);
        line-height: 1.7;
        margin-bottom: 2rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .image-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 2rem;

        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.01);
            }
        }
    }
}

.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;

    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;

        img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }

        .close-button {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0.5rem;
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.2);
            }
        }
    }
}
</style>
