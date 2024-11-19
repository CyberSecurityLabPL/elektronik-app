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
