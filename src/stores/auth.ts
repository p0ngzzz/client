// using pinia
import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composables/useApi'

// use interface for create user model => represent state use
export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  full_name?: string // ? mean optional can have or not
}

// create model for whole state
export interface State {
  user: User | null
  accessToken: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  // username, email, first_name, last_name, password, password_confirm
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {} as User,
      accessToken: '' as string
    }
  },
  getters: {
    userDetail: (state: State) => state.user, //from begin name of getters is user equal to name of state user => it must not be same name
    isAuthenticated: (state: State) => (state.user?.id ? true : false)
  },
  // mutations: {
  //   setAccessToken: (state, token) => {
  //     state.accessToken = token
  //   },
  //   setUser: (state, user) => {
  //     state.user = user
  //   }
  // },
  actions: {
    async attempt() {
      //  this function use for whe user attempt go to route we will check login
      try {
        await this.refresh()
        await this.getUser()
      } catch (err) {
        return
      }
    },
    async login(payload: LoginData) {
      try {
        const api = useApi()
        const { data } = await api.post(`/api/auth/login`, payload)
        this.accessToken = data?.access_token
        await this.getUser()
        return data
      } catch (err: Error | any) {
        throw err.response.message
      }
    },
    async register(payload: RegisterData) {
      try {
        const api = useApi()
        const data = await api.post('/api/auth/register', payload)
        console.log('data: ', data)
        return data
      } catch (err: Error | any) {
        throw err.response.message
      }
    },
    async getUser() {
      try {
        const api = useApiPrivate() // use useApiPrivate for api what we need to login first
        const { data } = await api.get(`/api/auth/user`)
        this.user = data
        return data
      } catch (err: Error | any) {
        throw err.response.message
      }
    },
    async logout() {
      try {
        const api = useApi()
        const { data } = await api.post(`/api/auth/logout`)
        this.accessToken = ''
        this.user = {} as User
        return data
      } catch (err: Error | any) {
        throw err.response.message
      }
    },
    async refresh() {
      try {
        const api = useApi() // use useApiPrivate for api what we need to login first
        const { data } = await api.post(`/api/auth/refresh`)
        this.accessToken = data?.access_token
        return data
      } catch (err: Error | any) {
        throw err.response.message
      }
    }
  }
})
