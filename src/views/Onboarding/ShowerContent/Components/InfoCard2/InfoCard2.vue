<template>
    <section class="section">
        <div class="content-wrapper">
            <div class="header">
                <h2 v-if="title">{{ title }}</h2>
                <span v-if="emoji" class="emoji">{{ emoji }}</span>
            </div>
            
            <div class="text-content">
                <p v-if="text1" class="main-text">{{ text1 }}</p>
                <p v-if="text2" class="secondary-text">{{ text2 }}</p>
                <p v-if="text3" class="secondary-text">{{ text3 }}</p>
            </div>

            <div v-if="list && list.length" class="list-container">
                <ul>
                    <li v-for="(item, index) in list" :key="index">
                        <span class="bullet">•</span>
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '' },
    emoji: { type: String, default: '' },
    text1: { type: String, default: '' },
    text2: { type: String, default: '' },
    text3: { type: String, default: '' },
    list: { type: Array, default: () => [] }
})
</script>

<style scoped lang="scss">
.section {
    border-radius: 22px;
    padding: 2.5rem;
    margin: 4rem auto;
    max-width: 80%;
    background: #f8f8f8;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

    .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid rgba(0, 240, 255, 0.2);

        h2 {
            font-size: 2rem;
            color: black;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .emoji {
            font-size: 2.5rem;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
    }

    .text-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .main-text {
            font-size: 1.2rem;
            color: black;
            line-height: 1.8;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            padding-left: 1rem;
            border-left: 3px solid #00f0ff;
        }

        .secondary-text {
            font-size: 1.1rem;
            color: black;
            line-height: 1.7;
            padding-left: 1rem;
        }
    }

    .list-container {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(0, 240, 255, 0.05);
        border-radius: 12px;

        ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            li {
                background: rgba(0, 240, 255, 0.07);
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                color: black;
                font-size: 1.1rem;
                line-height: 1;

                .bullet {
                    color: #00f0ff;
                    font-size: 1.5rem;
                    line-height: 1;
                }
            }
        }
    }
}
</style> 