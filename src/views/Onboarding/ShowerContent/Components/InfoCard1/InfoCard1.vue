<template>
    <section class="section">
        <h2>{{ emoji }} {{ title }}</h2>
        <p v-if="text1">{{ text1 }}</p>
        <p v-if="text2">{{ text2 }}</p>
        <p v-if="text3">{{ text3 }}</p>
        <p v-if="text4">{{ text4 }}</p>
        <ul v-if="li1 || li2 || li3 || li4 || li5">
            <li v-if="li1">{{ li1 }}<span v-if="li1_span">{{ li1_span }}</span></li>
            <li v-if="li2">{{ li2 }}<span v-if="li2_span">{{ li2_span }}</span></li>
            <li v-if="li3">{{ li3 }}<span v-if="li3_span">{{ li3_span }}</span></li>
            <li v-if="li4">{{ li4 }}<span v-if="li4_span">{{ li4_span }}</span></li>
            <li v-if="li5">{{ li5 }}<span v-if="li5_span">{{ li5_span }}</span></li>
        </ul>
        <img 
            class="img-wide" 
            :src="image" 
            :alt="alt_img" 
        />
    </section>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '' },
    emoji: { type: String, default: '' },
    text1: { type: String, default: '' },
    text2: { type: String, default: '' },
    text3: { type: String, default: '' },
    text4: { type: String, default: '' },
    li1: { type: String, default: '' },
    li2: { type: String, default: '' },
    li3: { type: String, default: '' },
    li4: { type: String, default: '' },
    li5: { type: String, default: '' },
    li1_span: { type: String, default: '' },
    li2_span: { type: String, default: '' },
    li3_span: { type: String, default: '' },
    li4_span: { type: String, default: '' },
    li5_span: { type: String, default: '' },
    image: { type: String, default: '' },
    alt_img: { type: String, default: '' },
})
</script>

<style scoped lang="scss">
.section {
    border-radius: 16px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin: 5rem auto;
    max-width: 70%;
    background: #a1a1a1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    p {
        color: black;
        line-height: 1.6;
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }

    ul {
        list-style: none;
    }

    li {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        text-align: left;
        font-weight: bold;

        span {
            font-size: 1rem;
            font-weight: normal;
            margin-left: 0.5rem;
        }
    }

    .img-wide {
        width: 100%;
        max-width: 700px;
        display: block;
        margin: 1.5rem auto;
        border-radius: 10px;
        box-shadow: 0 0 16px #00f0ff44;
    }
}
</style>
