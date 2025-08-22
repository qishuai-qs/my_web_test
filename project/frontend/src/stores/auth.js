import { defineStore } from 'pinia'
import api from '../api'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/auth/login', credentials)
        this.token = response.token
        this.user = response.user
        localStorage.setItem('authToken', this.token)
        router.push('/')
      } catch (error) {
        this.error = error.response?.data?.message || '登录失败'
        throw error
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('authToken')
      router.push('/login')
    },
    async fetchUser() {
      if (!this.token) return
      
      try {
        this.user = await api.get('/auth/me')
      } catch (error) {
        this.logout()
      }
    }
  }
})