import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userRole: localStorage.getItem('userRole') || 'CLIENT'
  }),
  getters: {
    getUserRole: (state) => state.userRole
  },
  actions: {
    setUserRole(role) {
      this.userRole = role;
      localStorage.setItem('userRole', role);
    }
  }
}) 