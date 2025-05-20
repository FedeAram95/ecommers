<template>
    <div class="shower-content" ref="contentRef">
        <StartView v-if="!selectedItem || selectedItem.view === 'StartView'" />
        <ArchitectureView v-else-if="selectedItem.view === 'ArchitectureView'" />
        <DatabaseView v-else-if="selectedItem.view === 'DatabaseView'" />
        <GitView v-else-if="selectedItem.view === 'GitView'" />
        <IDEFrontEndView v-else-if="selectedItem.view === 'IDEFrontEndView'" />
        <IDEBackEndView v-else-if="selectedItem.view === 'IDEBackEndView'" />
        <JavaView v-else-if="selectedItem.view === 'JavaView'" />
        <NodeView v-else-if="selectedItem.view === 'NodeView'" />
        <ScrumView v-else-if="selectedItem.view === 'ScrumView'" />
        <SpringView v-else-if="selectedItem.view === 'SpringView'" />
        <StructureBackView v-else-if="selectedItem.view === 'StructureBackView'" />
        <StructureFrontView v-else-if="selectedItem.view === 'StructureFrontView'" />
        <VueView v-else-if="selectedItem.view === 'VueView'" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ArchitectureView from '@/views/Onboarding/ShowerContent/Children/Architecture/ArchitectureView.vue'
import DatabaseView from '@/views/Onboarding/ShowerContent/Children/Database/DatabaseView.vue'
import GitView from '@/views/Onboarding/ShowerContent/Children/Git/GitView.vue'
import IDEBackEndView from '@/views/Onboarding/ShowerContent/Children/IDE/IDEBackEndView.vue'
import IDEFrontEndView from '@/views/Onboarding/ShowerContent/Children/IDE/IDEFrontEndView.vue'
import JavaView from '@/views/Onboarding/ShowerContent/Children/Java/JavaView.vue'
import NodeView from '@/views/Onboarding/ShowerContent/Children/Node/NodeView.vue'
import ScrumView from '@/views/Onboarding/ShowerContent/Children/Scrum/ScrumView.vue'
import SpringView from '@/views/Onboarding/ShowerContent/Children/Spring/SpringView.vue'
import StartView from '@/views/Onboarding/ShowerContent/Children/Start/StartView.vue'
import StructureBackView from '@/views/Onboarding/ShowerContent/Children/Structure/StructureBackView.vue'
import StructureFrontView from '@/views/Onboarding/ShowerContent/Children/Structure/StructureFrontView.vue'
import VueView from '@/views/Onboarding/ShowerContent/Children/Vue/VueView.vue'

const emit = defineEmits(['update:selectedItem'])
const contentRef = ref(null)

const props = defineProps({
    selectedItem: {
        type: Object,
        default: () => ({
            name: 'Inicio',
            icon: '🏠',
            view: 'StartView',
            route: '/inicio'
        })
    }
})

watch(() => props.selectedItem, () => {
    setTimeout(() => {
        if (contentRef.value) {
            contentRef.value.scrollTop = 0
        }
    }, 0)
}, { deep: true })

onMounted(() => {
    if (!props.selectedItem) {
        emit('update:selectedItem', {
            name: 'Inicio',
            icon: '🏠',
            view: 'StartView',
            route: '/inicio'
        })
    }
})
</script>

<style scoped lang="sass">
.shower-content
    margin: 0
    padding: 0
    position: fixed
    top: 5rem
    left: 13rem
    right: 0
    bottom: 0
    width: calc(100% - 13rem)
    height: calc(100vh - 5rem)
    overflow-y: auto
    overflow-x: hidden

    &::before
        content: ''
        position: fixed
        top: 5rem
        left: 13rem
        right: 0
        bottom: 0
        background-image: url('@/assets/LandingBackground.png')
        background-size: 300px
        background-position: center
        background-repeat: repeat
        opacity: 0.5
        z-index: -1
</style> 