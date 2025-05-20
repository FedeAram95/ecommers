<template>
  <aside
    v-if="isSeller"
    class="sidebar"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <ul class="sidebar-list">
      <li class="sidebar-item">
        <router-link to="/productList" class="sidebar-link">
          <svg class="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span class="sidebar-text" :class="{ 'visible': isHovered }">Productos</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link to="/vender" class="sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon">
            <path d="M16 16h6" />
            <path d="M19 13v6" />
            <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
            <path d="m7.5 4.27 9 5.15" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <line x1="12" x2="12" y1="22" y2="12" />
          </svg>
          <span class="sidebar-text" :class="{ 'visible': isHovered }">Vender</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store'

const isHovered = ref(false)
const store = useUserStore()

const isSeller = computed(() => store.getUserRole === 'SELLER')
const isAdmin = computed(() => store.getUserRole === "ADMIN")

</script>

<style scoped>
.sidebar {
  position: fixed;
  padding-right: 64px;
  left: 0;
  top: 20vh;
  z-index: 1000;
  height: 18vh;
  width: 56px;
  overflow: hidden;
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #374151;
  transition: all 0.3s ease-in-out;
}

.sidebar:hover {
  width: 160px;
}

.sidebar-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 16px;
  margin-top: 16px;
  text-align: start;
  color: white;
}

.sidebar-item {
  margin-bottom: 16px;
  display: flex;
  min-width: 100%;
  align-items: center;
}

.sidebar-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.sidebar-icon {
  height: 20px;
  width: 20px;
  flex-shrink: 0;
  color: #d4d4d8;
}

.sidebar-text {
  margin-left: 12px;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.sidebar-text.visible {
  opacity: 1;
}
</style>
