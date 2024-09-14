<template lang="">
  <div id="user" class="mt-5">
    <div class="container">
      <Suspense>
        <template #default>
          <div v-if="user" class="card card-body mt-4">
            <h5 class="card-title">Username: {{ user.username }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.email }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">First Name: {{ user.first_name }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Last Name: {{ user.last_name }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Full Name: {{ user.full_name }}</h6>
          </div>
        </template>

        <template #fallback>
  <p>Loading...</p>
</template>
      </Suspense>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = computed(() => {
  return authStore.userDetail //getter
})
async function getUser() {
  return await authStore.getUser() // action
}

onMounted(async () => {
  await getUser()
  // console.log('authStore.userDetail: ', authStore.userDetail)
  // console.log(authStore.userDetail.username)
})
</script>
<style lang=""></style>
