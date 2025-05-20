<template>
    <section class="cover">
            <img v-if="image" class="logo" :src="image" :alt="alt_img" />
            <h1 
            v-if="title"
            :style="{ 
                color: color,
                textDecorationLine: under ? 'underline' : 'none',
                textUnderlineOffset: under ? '8px' : '0'
            }">{{ title }}</h1>
        </section>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '' },
    under: { type: Boolean, default: false },
    image: { type: String, default: '' },
    alt_img: { type: String, default: '' },
    color: { type: String, default: '' },
})

</script>

<style scoped lang="scss">
.cover {
    flex-direction: column;
    align-items: center;
    display: flex;
    min-height: 24vh;

    .logo {
        width: 160px;
        margin-bottom: 2rem;
        margin-top: 1rem;
    }
    h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
}
</style>
