import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: []
  }),
  getters: {
    productCount: (state) => state.products.length
  },
  actions: {
    async fetchProducts() {
      // Example: Fetch product data from an API
      const response = await fetch('/api/products')
      this.products = await response.json()
    },
    addProduct(product) {
      this.products.push(product)
    }
  }
})
