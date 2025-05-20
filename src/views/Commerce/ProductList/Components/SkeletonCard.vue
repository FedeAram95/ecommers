<template>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
  </div>
</template>

<style scoped>
.skeleton-card {
  position: relative;
  max-width: 20rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton-image {
  margin-bottom: 1rem;
  height: 14rem;
  border-radius: 0.375rem;
  background-color: #d1d5db;
}

.skeleton-line {
  margin-bottom: 0.5rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  background-color: #d1d5db;
}

.skeleton-line.short {
  height: 0.75rem;
}
</style>
