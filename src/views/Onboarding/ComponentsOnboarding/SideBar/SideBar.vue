<template>
    <aside class="sidebar">
        <ul class="sidebar-list">
            <li 
                class="sidebar-item"
                v-for="(item, index) in sidebarItems" 
                :key="item.name">
                <div 
                    class="sidebar-item-header" 
                    @click="item.children ? toggleItem(index) : selectItem(item)"
                    :class="{ 'active': activeItem === index, 'no-children': !item.children }">
                    <div class="item-content">
                        <span class="item-icon">{{ item.icon }}</span>
                        <span class="item-name">{{ item.name }}</span>
                    </div>
                    <div 
                        v-if="item.children"
                        class="arrow" 
                        :class="{ 'arrow-down': activeItem === index }">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <transition name="slide">
                    <ul 
                        v-if="item.children"
                        class="sidebar-submenu" 
                        v-show="activeItem === index">
                        <li 
                            class="sidebar-subitem"
                            v-for="child in item.children" 
                            :key="child.name"
                            @click="selectItem(child)">
                            <span class="subitem-name">{{ child.name }}</span>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['select-item'])
const activeItem = ref(null)

const toggleItem = (index) => {
    if (activeItem.value === index) {
        activeItem.value = null
    } else {
        activeItem.value = index
    }
}

const selectItem = (item) => {
    emit('select-item', item)
}

const sidebarItems = [
    { name: 'Inicio', icon: '🏠', view: 'StartView', route: '/start' },
    { name: 'General', icon: '⚙️', route: '/general',children: [
        { name: 'Arquitectura del proyecto', view: 'ArchitectureView', route: '/ArchitectureView' },
        { name: 'Scrum - Jira', view: 'ScrumView', route: '/ScrumView' },
        { name: 'Git - Github', view: 'GitView', route: '/GitView' },
    ]},
    { name: 'Front End', icon: '💻', route: '/front-end', children: [
        { name: 'Node', view: 'NodeView', route: '/NodeView' },
        { name: 'IDE - Front End', view: 'IDEFrontEndView', route: '/IDEFrontEndView' },
        { name: 'Init Vue', view: 'VueView', route: '/VueView' },
        { name: 'Estructura de Front', view: 'StructureFrontView', route: '/StructureFrontView' },
    ]},
    { name: 'Back End', icon: '⚡', route: '/back-end', children: [
        { name: 'Java', view: 'JavaView', route: '/JavaView' },
        { name: 'IDE - Back End', view: 'IDEBackEndView', route: '/IDEBackEndView' },
        { name: 'Init Spring', view: 'SpringView', route: '/SpringView' },
        { name: 'Estructura de Back', view: 'StructureBackView', route: '/StructureBackView' },
        { name: 'Base de Datos', view: 'DatabaseView', route: '/DatabaseView' },
    ]}
]
</script>

<style scoped lang="sass">
.sidebar
    position: fixed
    top: 80px
    left: 0
    width: 13rem
    height: 100vh
    background: #3d3e4b
    padding: 0
    z-index: 100
    display: flex
    flex-direction: column
    box-shadow: 2px 0 10px rgba(0,0,0,0.1)

    .sidebar-list
        list-style: none
        margin-top: 2rem
        padding: 0 1rem
        flex: 1
        overflow-y: auto

        &::-webkit-scrollbar
            width: 4px

        &::-webkit-scrollbar-track
            background: rgba(255,255,255,0.1)

        &::-webkit-scrollbar-thumb
            background: rgba(255,255,255,0.2)
            border-radius: 2px

    .sidebar-item
        margin-bottom: 0.5rem

    .sidebar-item-header
        padding: 1rem
        cursor: pointer
        transition: all 0.1s ease
        border-radius: 8px
        display: flex
        justify-content: space-between
        align-items: center

        &:hover
            background: rgba(255,255,255,0.1)

        &.active
            background: rgba(255,255,255,0.15)

        &.no-children
            padding-right: 1rem

            &:hover
                background: rgba(255,255,255,0.1)
                transform: translateX(5px)

        .item-content
            display: flex
            align-items: center
            gap: 0.75rem

        .item-icon
            font-size: 1.2rem

        .item-name
            color: #ffffff
            font-size: 1rem
            font-weight: 500

        .arrow
            color: rgba(255,255,255,0.7)
            transition: transform 0.1s ease
            transform: rotate(0deg)
            display: flex
            align-items: center
            justify-content: center

            svg
                transition: transform 0.1s ease

            &.arrow-down
                transform: rotate(180deg)

    .sidebar-submenu
        list-style: none
        padding: 0.5rem 0 0.5rem 2.5rem
        margin: 0
        border-left: 1px solid rgba(255,255,255,0.1)

    .sidebar-subitem
        padding: 0.75rem 1rem
        cursor: pointer
        transition: all 0.1s ease
        border-radius: 6px
        display: flex
        align-items: center
        gap: 0.75rem
        margin-bottom: 0.25rem

        &:hover
            background: rgba(255,255,255,0.1)
            transform: translateX(5px)

        .subitem-icon
            font-size: 1rem
            opacity: 0.8

        .subitem-name
            color: rgba(255,255,255,0.9)
            font-size: 0.9rem

.slide-enter-active,
.slide-leave-active
    transition: all 0.1s ease

.slide-enter-from,
.slide-leave-to
    opacity: 0
    transform: translateY(-10px)
</style>
