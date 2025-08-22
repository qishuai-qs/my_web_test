import { defineStore } from 'pinia'
import api from '../api'

export const useResourceStore = defineStore('resources', {
  state: () => ({
    resources: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      perPage: 10
    }
  }),
  getters: {
    paginatedResources: (state) => {
      const start = (state.pagination.currentPage - 1) * state.pagination.perPage
      const end = start + state.pagination.perPage
      return state.resources.slice(start, end)
    }
  },
  actions: {
    async fetchResources() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/resources')
        this.resources = response
        this.pagination.totalPages = Math.ceil(response.length / this.pagination.perPage)
      } catch (error) {
        this.error = error.message || '获取资源失败'
      } finally {
        this.loading = false
      }
    },
    async createResource(resourceData) {
      try {
        const response = await api.post('/resources', resourceData)
        this.resources.unshift(response)
        return response
      } catch (error) {
        throw error
      }
    }
  }
})