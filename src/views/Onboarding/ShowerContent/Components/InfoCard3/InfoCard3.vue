<template>
    <section class="card">
        <div class="card-content">
            <div class="left-section">
                <div class="emoji-wrapper" v-if="emoji">
                    <span class="emoji">{{ emoji }}</span>
                </div>
            </div>

            <div class="right-section">
                <h2 v-if="title" class="title">{{ title }}</h2>
                <div class="text-container">
                    <p v-if="text1" class="text text-primary">{{ text1 }}</p>
                    <p v-if="text2" class="text text-secondary">{{ text2 }}</p>
                    <p v-if="text3" class="text text-secondary">{{ text3 }}</p>
                </div>

                <div v-if="list && list.length" class="list-wrapper">
                    <ul class="list">
                        <li v-for="(item, index) in list" :key="index" class="list-item">
                            <div class="list-number">{{ index + 1 }}</div>
                            <span class="list-text">{{ item }}</span>
                        </li>
                    </ul>
                </div>
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
.card {
    max-width: 70%;
    margin: 5rem auto;
    background: #2d3436;
    border-radius: 30px;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(45, 52, 54, 0) 0%, rgba(45, 52, 54, 1) 70%);
        z-index: 1;
    }

    .card-content {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        padding: 3rem;
        z-index: 2;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            padding: 2rem;
        }
    }

    .left-section {
        position: relative;
        display: flex;
        align-items: flex-start;
        padding-top: 1rem;

        .emoji-wrapper {
            position: sticky;
            top: 2rem;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #6c5ce7, #a29bfe);
            border-radius: 20px;
            box-shadow: 0 0 30px rgba(108, 92, 231, 0.3);
            transition: transform 0.3s ease;

            .emoji {
                font-size: 3rem;
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
            }
        }
    }

    .right-section {
        .title {
            font-size: 2rem;
            color: #fff;
            margin: 0 0 2rem 0;
            font-weight: 600;
            line-height: 1.4;
            background: linear-gradient(135deg, #a29bfe, #6c5ce7);
            -webkit-text-fill-color: transparent;
        }

        .text-container {
            margin-bottom: 2rem;

            .text {
                font-size: 1.1rem;
                line-height: 1.8;
                margin-bottom: 1.5rem;
                color: #dfe6e9;

                &.text-primary {
                    font-size: 1.3rem;
                    color: #fff;
                    font-weight: 500;
                    padding: 1.5rem;
                    background: rgba(108, 92, 231, 0.1);
                    border-radius: 16px;
                    border-left: 4px solid #6c5ce7;
                }

                &.text-secondary {
                    color: #b2bec3;
                }
            }
        }

        .list-wrapper {
            .list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;

                .list-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(108, 92, 231, 0.1);
                        transform: translateY(-3px);
                        border-color: rgba(108, 92, 231, 0.3);
                    }

                    .list-number {
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
                        border-radius: 50%;
                        color: #fff;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }

                    .list-text {
                        color: #dfe6e9;
                        font-size: 1rem;
                        flex: 1;
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .card {
        max-width: 95%;
        margin: 2rem auto;

        .card-content {
            padding: 1.5rem;
        }

        .left-section {
            justify-content: center;
            padding-top: 0;
            margin-bottom: 1rem;

            .emoji-wrapper {
                position: relative;
                top: 0;
                width: 70px;
                height: 70px;

                .emoji {
                    font-size: 2.5rem;
                }
            }
        }

        .right-section {
            .title {
                font-size: 1.8rem;
                text-align: center;
                margin-bottom: 1.5rem;
            }
        }
    }
}
</style> 