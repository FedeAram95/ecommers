<template>
    <header class="header-onb">
        <LandingButton 
            style="position: absolute; margin-left: 5rem;"
        />
        <h1>Onboarding - Tecnológico</h1>
        <slot />
        <div class="header-separator"></div>
    </header>
</template>

<script setup>
import LandingButton from '@/generalComponents/LandingButton/View/LandingButton.vue'
</script>

<style scoped lang="sass">
.header-onb
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 5rem
    background-color: #2c2d36
    z-index: 101
    display: flex
    align-items: center

    h1
        margin: 0
        margin-left: 220px
        font-size: 1.7rem
        font-weight: 700
        background: linear-gradient(180deg, #ffffff 0%, #a8a8a8 100%)
        -webkit-background-clip: text
        color: transparent
        text-transform: uppercase
        letter-spacing: 3px
        position: relative
        text-shadow: 2px 2px 4px rgba(0,0,0,0.4)

.header-separator
    width: 100%
    height: 3px
    background: #0082BE
    margin: 0
    border: none
    box-shadow: 0 1px 4px #0082be44
    position: absolute
    left: 0
    bottom: 0
    z-index: 201
</style>