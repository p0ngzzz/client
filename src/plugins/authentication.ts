// plugins/authentication

import { useAuthStore } from '@/stores/auth'

export const authentication = {
  async install() {
    const store = useAuthStore()
    try {
      await store.attempt()
      return
    } catch (err) {
      console.log(err)
      return
    }
  }
}
