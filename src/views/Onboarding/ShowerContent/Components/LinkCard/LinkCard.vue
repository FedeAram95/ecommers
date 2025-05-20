<template>
    <div class="link-card">
        <h2>{{ title }}</h2>
        <div class="download-links">
            <a 
                v-for="(link, index) in links" 
                :key="index"
                :href="link.url" 
                target="_blank" 
                class="download-button"
                :style="{ backgroundColor: color }"
            >
                <span class="icon">{{ link.icon }}</span>
                {{ link.text }}
            </a>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    links: { type: Array, required: true, default: () => [] },
    color: { type: String, default: 'blue' }
})
</script>

<style scoped lang="scss">
.link-card {
    border-radius: 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin: 6rem auto;
    max-width: 40%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    
    h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .download-links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        .download-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 400px;
            justify-content: center;

            &:hover {
                filter: brightness(0.9);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .icon {
                font-size: 1.2rem;
            }
        }
    }
}
</style> 