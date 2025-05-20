<template>
  <div class="search-container" ref="searchContainer">
    <input
      type="text"
      v-model="query"
      @input="handleInput"
      placeholder="Buscar productos ..."
      class="search-input"
    />
    <button @click="clearSearch" class="clear-button">
      <span v-if="query">X</span>
    </button>
    <ul v-if="suggestions.length" class="suggestions-list">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="suggestion-item"
      >
        {{ suggestion.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  fetchSuggestions: {
    type: Function,
    required: true,
  },
});

const query = ref("");
const suggestions = ref([]);
const searchContainer = ref(null);

const clearSearch = () => {
  query.value = "";
  suggestions.value = [];
};

const handleClickOutside = (event) => {
  if (
    searchContainer.value &&
    !searchContainer.value.contains(event.target)
  ) {
    suggestions.value = [];
  }
};

watch(query, (newVal) => {
  if (newVal.length >= 1) {
    props.fetchSuggestions(newVal).then((results) => {
      suggestions.value = results;
    });
  } else {
    suggestions.value = [];
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.search-container {
  position: relative;
  top: 0;
  width: 250px;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  height: 42px;
  border-radius: 30px;
  font-size: 14px;
  border: none;
  background-color: white;
  padding: 12px 20px 12px 40px;
  box-sizing: border-box;
  transition: background-color 0.3s;
}

.search-input:hover,
.search-input:focus {
  background-color: #f9fafb;
  outline: none;
}

.clear-button {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.clear-button:hover {
  color: #4b5563;
}

.suggestions-list {
  position: absolute;
  z-index: 10;
  margin-top: 4px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: white;
  padding: 8px;
  text-align: start;
  box-sizing: border-box;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.suggestion-item {
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.2s;
  font-size: 14px;
}

.suggestion-item:hover {
  background-color: #e5e7eb;
}
</style>
