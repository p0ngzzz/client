// utils folder use for configuration
import axios from 'axios'

// customize axiosInstance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true, //send cookies with cross site origin
  headers: {
    'Content-Type': ' application/json'
  }
})

// axios Private Instance
export const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true, //send cookies with cross site origin
  headers: {
    'Content-Type': ' application/json'
  }
})
