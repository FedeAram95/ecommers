<template>
    <HeaderOnb />
    <SideBar @select-item="handleItemSelect" />
    <main class="main-content">
        <ShowerContent 
            :selected-item="selectedItem"
            @update:selected-item="selectedItem = $event"
        />
    </main>
    <LoaderView v-if="isLoading"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoaderView from '@/generalComponents/Loader/LoaderView.vue'
import HeaderOnb from '@/views/Onboarding/ComponentsOnboarding/Header/HeaderOnb.vue'
import SideBar from '@/views/Onboarding/ComponentsOnboarding/SideBar/SideBar.vue'
import ShowerContent from '@/views/Onboarding/ShowerContent/ShowerContent.vue'

const isLoading = ref(true)
const selectedItem = ref(null)

const handleItemSelect = (item) => {
    selectedItem.value = item
}

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
})
</script>

<style scoped lang="sass">
    .main-content
        margin-left: 220px
        margin-top: 80px
        padding: 2rem
        min-height: calc(100vh - 80px)
</style>
