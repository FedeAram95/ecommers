<template>
    <div class="sidebar-logo" @click="router.push('/')">
        <img src="@/assets/Landing.png" alt="Home" />
      </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

    const router = useRouter()
</script>

<style scoped>
    .sidebar-logo {
        position: relative;
        width: 50px;
        height: 50px;
        background-color: #2c2d36;
        border-radius: 2rem;
        display: flex;
        justify-content: center; 
        align-items: center;
        cursor: pointer;
        transition: transform 0.3s;
    }

    .sidebar-logo:hover {
        transform: scale(1.05);
    }
    .sidebar-logo img {
        width: 30px;
        height: 30px;
        object-fit: contain;
    }
</style>
