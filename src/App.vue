<script>
import { RouterLink, RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'

export default {
  components: {
    NavbarComponent
  }
}
</script>

<template>
  <div id="app">
    <NavbarComponent />
    <RouterView />
  </div>
</template>

<style scoped>
</style>