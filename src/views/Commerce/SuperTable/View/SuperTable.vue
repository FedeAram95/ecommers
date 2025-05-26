<template>
  <!-- mismo template sin cambios -->
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  name: 'SuperTable',
  props: {
    data: Array,
    headers: Array,
    clearSelected: String,
    deleteTitle: String,
    permissions: {
      type: Object,
      default: () => ({ update: false, delete: false }),
    },
    sortBy: String,
    sortDesc: Boolean,
    pageCount: { type: Number, default: 1 },
    page: { type: Number, default: 1 },
    totalItems: Number,
    disableCheckboxs: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:sortBy',
    'update:sortDesc',
    'updateData',
    'deleteData',
    'bulk-delete',
    'searchAction',
    'length-pagination-change',
    'next-pagination',
    'previous-pagination',
    'input-pagination',
  ],
  data() {
    return {
      selectedItems: [],
      timeout: null,
      search: '',
      itemsPerPage: 20,
      itemsPerPageAvailable: [20, 50, 100, 200],
      goToPage: 1,
    };
  },
  methods: {
    keyup() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.searchAction();
        clearTimeout(this.timeout);
      }, 1000);
    },
    searchAction() {
      this.$emit('searchAction', this.search);
    },
    changePage() {
      if (this.goToPage > this.pageCount) this.goToPage = this.page;
      else this.$emit('input-pagination', this.goToPage);
    },
    editItem(id) {
      this.$emit('updateData', id);
    },
    deleteItem(id) {
      this.$emit('deleteData', id);
    },
  },
  watch: {
    page(val) {
      if (val > this.pageCount) this.page = this.pageCount;
      if (val < 1) this.page = 1;
      if (this.page !== this.goToPage) this.goToPage = this.page;
    },
    clearSelected() {
      this.selectedItems = [];
    },
  },
  computed: {
    itemsCount() {
      const counter = {
        totalItems: this.totalItems,
        startItem: (this.page - 1) * this.itemsPerPage + 1,
        endItem: this.page * this.itemsPerPage,
      };
      if (counter.endItem > this.totalItems) counter.endItem = this.totalItems;
      return counter;
    },
  },
};
</script>
