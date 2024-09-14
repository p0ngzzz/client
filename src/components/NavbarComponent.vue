<template lang="">
  <nav class="bg-dark navbar navbar-expand-lg navbar-light d-flex justify-content-between px-4">
    <div class="d-flex justify-content-center">
      <router-link :to="{ name: 'home' }" class="navbar-brand text-light fs-3 fw-bold" href="#">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#appNavbar"
        aria-controls="appNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <div class="collapse navbar-collapse d-flex justify-content-end" id="appNavbar">
      <ul class="navbar-nav mr-auto">
        <li class="me-3">
          <router-link :to="{ name: 'home' }" class="nav-link text-light fs-5" href="#">Home</router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item dropdown me-3">
          <a
            class="nav-link dropdown-toggle text-light fs-5"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            User
          </a>
          <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
            <li><router-link :to="{name: 'user'}" class="dropdown-item bg-dark text-light" href="#">Username</router-link></li>
            <li><hr class="dropdown-divider" /></li>
            <li><router-link @click="logout()" :to="{name: 'logout'}" class="dropdown-item bg-dark text-light" href="#">Logout</router-link></li>
          </ul>
        </li>
        <template v-else>
          <li class="bg-dark text-light nav-item active me-3">
            <router-link :to="{ name: 'login' }" class="nav-link text-light fs-5" href="#">Login</router-link>
          </li>
          <li class="bg-dark text-light nav-item active me-3">
            <router-link :to="{ name: 'register' }" class="nav-link text-light fs-5" href="#">Register</router-link>
          </li>
        </template>
        
        
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore, type User } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = reactive<User>({
  id: 0,
  username: '',
  email: '',
  first_name: '',
  last_name: ''
})
const errorMessage = ref<string>('')

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated
})

console.log('isAuthenticated: ', isAuthenticated)
async function logout() {
  await authStore
    .logout()
    .then((res) => {
      console.log(res)
      console.log('isAuthenticated: ', isAuthenticated.value)
      router.replace({ name: 'home' })
    })
    .catch((err) => {
      errorMessage.value = err.message
      console.log('errpr message: ', errorMessage.value)
    })
}
</script>
<style scoped>
</style>
