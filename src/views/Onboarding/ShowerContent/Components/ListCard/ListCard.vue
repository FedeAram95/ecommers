<template>
    <section class="section">
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="text">{{ text }}</p>
        <div class="list">
            <div class="status-card" v-if="item1 || item1_img">
                <img v-if="item1_img" :src="item1_img" :alt="item1_img_alt" @click="expandImage(item1_img)" />
                <h3 v-if="item1">{{ item1 }}</h3>
                <p v-if="item1_text">{{ item1_text }}</p>
            </div>
            <div class="status-card" v-if="item2 || item2_img">
                <img v-if="item2_img" :src="item2_img" :alt="item2_img_alt" @click="expandImage(item2_img)" />
                <h3 v-if="item2">{{ item2 }}</h3>
                <p v-if="item2_text">{{ item2_text }}</p>
            </div>
            <div class="status-card" v-if="item3 || item3_img">
                <img v-if="item3_img" :src="item3_img" :alt="item3_img_alt" @click="expandImage(item3_img)" />
                <h3 v-if="item3">{{ item3 }}</h3>
                <p v-if="item3_text">{{ item3_text }}</p>
            </div>
            <div class="status-card" v-if="item4 || item4_img">
                <img v-if="item4_img" :src="item4_img" :alt="item4_img_alt" @click="expandImage(item4_img)" />
                <h3 v-if="item4">{{ item4 }}</h3>
                <p v-if="item4_text">{{ item4_text }}</p>
            </div>
            <div class="status-card" v-if="item5 || item5_img">
                <img v-if="item5_img" :src="item5_img" :alt="item5_img_alt" @click="expandImage(item5_img)" />
                <h3 v-if="item5">{{ item5 }}</h3>
                <p v-if="item5_text">{{ item5_text }}</p>
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
    text: { type: String, default: '' },
    item1: { type: String, default: '' },
    item1_text: { type: String, default: '' },
    item1_img: { type: String, default: '' },
    item1_img_alt: { type: String, default: '' },
    item2: { type: String, default: '' },
    item2_text: { type: String, default: '' },
    item2_img: { type: String, default: '' },
    item2_img_alt: { type: String, default: '' },
    item3: { type: String, default: '' },
    item3_text: { type: String, default: '' },
    item3_img: { type: String, default: '' },
    item3_img_alt: { type: String, default: '' },
    item4: { type: String, default: '' },
    item4_text: { type: String, default: '' },
    item4_img: { type: String, default: '' },
    item4_img_alt: { type: String, default: '' },
    item5: { type: String, default: '' },
    item5_text: { type: String, default: '' },
    item5_img: { type: String, default: '' },
    item5_img_alt: { type: String, default: '' },
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
    max-width: 85%;
    background: rgba(20, 20, 20, 0.9);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 2rem;
        margin-bottom: 3rem;
        color: #00f0ff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    p {
        font-size: 1.2rem;
        margin-top: 2rem;
        margin-bottom: 4rem;
        color: #fcf488;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;

        .status-card {
            background: #181c24;
            border-radius: 12px;
            box-shadow: 0 2px 8px #00f0ff22;
            padding: 1.5rem 1.2rem;
            flex: 0 0 320px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            img {
                width: 280px;
                height: 280px;
                object-fit: contain;
                margin-bottom: 0.7rem;
                cursor: pointer;
                transition: transform 0.3s ease;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 1rem;

                &:hover {
                    transform: scale(1.05);
                }
            }

            h3 {
                margin: 0.5rem 0 0.7rem 0;
                color: #00f0ff;
                font-size: 1.3rem;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            }
            p {
                font-size: 1.1rem;
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.7;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
