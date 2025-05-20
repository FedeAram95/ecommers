<template>
    <section class="section">
            <h2 v-if="title"><span>{{ '⚠️' }}</span> {{ title }}</h2>
            <p v-if="text1">{{ text1 }}</p>
            <a v-if="link" :href="link" target="_blank">{{ linkText }}</a>
        </section>
</template>

<script setup>

const props = defineProps({
    title: { type: String, default: '' },
    text1: { type: String, default: '' },
    text2: { type: String, default: '' },
    text3: { type: String, default: '' },
    link: { type: String, default: '' },
    linkText: { type: String, default: '' },
})
</script>

<style scoped lang="scss">
.section {
    border-radius: 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin: 5rem auto;
    max-width: 60%;
    background: rgba(253, 237, 87, 0.95);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

        span {
            font-size: 2.2rem;
        }
    }

    p {
        color: #34495e;
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    a {
        display: block;
        text-align: left;
        padding: 1rem;
        font-weight: 500;
        font-size: 1.1rem;
        color: #3498db;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: #2980b9;
        }
    }
}

</style>
