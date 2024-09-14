// composable use for request and response api (config for every request and response)
import { axiosInstance, axiosPrivateInstance } from '../utils/axios'
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'

// create function useApi
export const useApiPrivate = () => {
  // write for interceptor for modify request or response before sending
  const authStore = useAuthStore()

  watchEffect(() => {
    // check interceptor request
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // check interceptor response
    axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config

        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true // Mark the request as "sent" to avoid infinite loops
          try {
            // from before config if we set plugins/authentication it will authStore.refresh infinity loop cause we not have accessToken we need refreshToken for new accessToken but for real we not have refreshToken
            await authStore.refresh() // Refresh the access token using a store action

            prevRequest.headers['Authorization'] = authStore.accessToken // set new token  (update token)
            return axiosPrivateInstance(prevRequest) // Resend the original request with the updated token
          } catch (err) {
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      }
    )
  })

  return axiosPrivateInstance
}

export const useApi = () => {
  return axiosInstance
}
