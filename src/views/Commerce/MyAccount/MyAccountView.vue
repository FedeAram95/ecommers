<template>
    <HeaderView />
    <SidebarView />
    <aside class="sidebar">
        <div class="sidebar-content">
            <button class="sidebar-button" @click="selectedComponent = components.MyPurchases">
                <div class="button-content">
                    <span>Compras</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                    </svg>
                </div>
            </button>
            <button class="sidebar-button" @click="selectedComponent = components.MyAccountForm">
                <div class="button-content">
                    <span>Mi Cuenta</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                </div>
            </button>
        </div>
    </aside>
    <main class="main-content">
        <component :is="selectedComponent" />
    </main>
</template>

<script setup>
import { shallowRef, markRaw } from 'vue';
import HeaderView from '@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue';
import SidebarView from '@/views/Commerce/ComponentsCommerce/Sidebar/View/SidebarView.vue';
import MyPurchases from './Components/MyPurchases.vue';
import MyAccountForm from './Components/MyAccountForm.vue';

const components = {
  MyPurchases: markRaw(MyPurchases),
  MyAccountForm: markRaw(MyAccountForm)
};

const selectedComponent = shallowRef(components.MyAccountForm);
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 140px;
    left: 0;
    width: 20rem;
    height: calc(100vh - 140px);
    background-color: #f3f4f6;
    border-right: 1px solid #d1d5db;
    z-index: 99;
    transition: width 0.3s ease;
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding: 2rem 1rem;
    gap: 1rem;
}

.sidebar-button {
    width: 100%;
    padding: 1rem;
    color: #374151;
    text-align: left;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.sidebar-button:hover {
    background-color: #d1d5db;
    transform: translateX(5px);
}

.button-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.button-content span {
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.button-icon {
    height: 1.5rem;
    width: 1.5rem;
    min-width: 1.5rem;
}

.main-content {
    margin-left: 24rem;
    padding: 1rem;
    margin-top: 12rem;
    transition: margin-left 0.3s ease;
}

@media (max-width: 1024px) {
    .sidebar {
        width: 16rem;
    }

    .main-content {
        margin-left: 16rem;
    }
}

@media (max-width: 768px) {
    .sidebar {
        width: 12rem;
    }

    .main-content {
        margin-left: 12rem;
    }

    .button-content span {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .sidebar {
        width: 10rem;
    }

    .main-content {
        margin-left: 10rem;
    }

    .button-content span {
        font-size: 0.8rem;
    }
}

@media (max-width: 360px) {
    .sidebar {
        width: 8rem;
    }

    .main-content {
        margin-left: 8rem;
    }

    .button-content span {
        font-size: 0.75rem;
    }
}
</style>