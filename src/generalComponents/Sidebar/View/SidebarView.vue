<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <!-- Contenido del sidebar -->
    </div>
  </aside>
</template>

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
}

.sidebar-content {
  padding: 2rem 1rem;
}
</style> 