<template>
    <section class="section">
        <div class="content-wrapper">
            <div class="text-content">
                <h2 v-if="title">{{ title }}</h2>
                <p v-if="text1">{{ text1 }}</p>
                <p v-if="text2">{{ text2 }}</p>
            </div>
            <div class="images-container">
                <div class="image-wrapper" v-if="img1" @click="expandImage(img1)">
                    <img :src="img1" :alt="alt1" />
                </div>
                <div class="image-wrapper" v-if="img2" @click="expandImage(img2)">
                    <img :src="img2" :alt="alt2" />
                </div>
            </div>
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
    text1: { type: String, default: '' },
    text2: { type: String, default: '' },
    img1: { type: String, default: '' },
    img2: { type: String, default: '' },
    alt1: { type: String, default: '' },
    alt2: { type: String, default: '' }
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
    border: 8px solid rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin: 5rem auto;
    max-width: 85%;
    background: #cafbff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
        }
    }

    .text-content {
        flex: 1;
        padding-right: 2rem;

        h2 {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            color: #000000;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        p {
            font-size: 1.1rem;
            color: rgba(0, 0, 0, 0.9);
            line-height: 1.7;
            margin-bottom: 2rem;
        }
    }

    .images-container {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        @media (min-width: 768px) {
            flex-direction: row;
        }

        .image-wrapper {
            flex: 1;
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.1s;
            cursor: pointer;

            &:hover {
                transform: translateY(-5px);
            }

            img {
                width: 100%;
                height: 400px;
                object-fit: cover;
                display: block;
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