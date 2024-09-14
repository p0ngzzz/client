<template lang="">
  <div id="register" class="mt-5">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-xl-10 col-md-8 col-sm-6">
          <div class="card card card-body">
            <h5 class="card-title">Register</h5>
            <form @submit.prevent="submit()">
              <div class="mb-3">
                <label for="username" class="form-label">Username: </label>
                <input v-model="registerData.username" type="text" class="form-control" id="username" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Address:</label>
                <input v-model="registerData.email" type="email" class="form-control" id="email" />
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label">FirstName:</label>
                <input v-model="registerData.first_name" type="text" class="form-control" id="firstName" />
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">LastName:</label>
                <input v-model="registerData.last_name" type="text" class="form-control" id="lastName" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input v-model="registerData.password" type="password" class="form-control" id="password" />
              </div>
              <div class="mb-3">
                <label for="confirm-password" class="form-label">Confirm Password:</label>
                <input v-model="registerData.password_confirm" type="password" class="form-control" id="confirm-password" />
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="w-20 me-3 btn btn-lg btn-success d-flex align-center">
                  Register
                </button>
                <button type="button" class="w-20 btn btn-lg btn-danger d-flex align-center">
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type RegisterData } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const registerData = reactive<RegisterData>({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirm: ''
})
const errorMessage = ref<string>('')
async function submit() {
  await authStore
    .register(registerData)
    .then((res) => {
      console.log(res)
      router.replace({ name: 'login' })
    })
    .catch((err) => {
      errorMessage.value = err.message
    })
}
</script>
<style lang=""></style>
