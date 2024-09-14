<template lang="">
  <div id="login" class="mt-5">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-xl-10 col-md-8 col-sm-6">
          <div class="card card card-body">
            <h5 class="card-title">Login</h5>
            <form @submit.prevent="login()">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input v-model="loginData.email" type="email" class="form-control" id="email" />
                <!-- <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"> -->
                <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="loginData.password"
                  type="password"
                  class="form-control"
                  id="password"
                />
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="w-20 me-3 btn btn-lg btn-success d-flex align-center">
                  Login
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
import { useAuthStore, type LoginData } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  email: '',
  password: ''
})
const errorMessage = ref<string>('')

async function login() {
  await authStore
    .login(loginData)
    .then((res) => {
      console.log(res)
      router.replace({ name: 'user' })
    })
    .catch((err) => {
      errorMessage.value = err.message
    })
}
</script>
<style scoped></style>
