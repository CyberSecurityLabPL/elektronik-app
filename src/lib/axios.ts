import { API_URL, TIMETABLE_API_URL } from "@/constants/urls"
import axios from "axios"

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const timetableApi = axios.create({
  baseURL: TIMETABLE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

timetableApi.interceptors.request.use((config) => {
  console.log(`[Timetable API] Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
  return config
})

timetableApi.interceptors.response.use(
  (response) => {
    console.log(`[Timetable API] Response: ${response.status} ${response.config.url}`, JSON.stringify(response.data).slice(0, 200))
    return response
  },
  (error) => {
    console.error(`[Timetable API] Error: ${error.config?.url}`, error.message, error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)
