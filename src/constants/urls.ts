import { format } from "date-fns"

export const API_URL = "http://api.elektronik.zgora.pl/api"
export const BACKEND_URL = "http://api.elektronik.zgora.pl"

export const SUBSTITUTIONS_URL = (date: Date) =>
  `/substitutions?pagination[page]=1&pagination[pageSize]=1&sort[1]=createdAt:desc&filters[date][$eq]=${format(
    date,
    "yyyy-MM-dd",
  )}`

export const ARTICLES_URL = (page: number = 1, pageSize: number) =>
  `/articles?pagination[pageSize]=${pageSize}&pagination[page]=${page}`

export const ARTICLE_URL = (id: number) => `/articles/${id}`

export const EVENTS_URL = (page: number, pageSize: number) =>
  `/events?pagination[pageSize]=${pageSize}&pagination[page]=${page}`

export const EVENT_URL = (id: number) => `/events/${id}`

export const ANNOUNCEMENTS_URL = (page: number, pageSize: number) =>
  `/announcements?pagination[pageSize]=${pageSize}&pagination[page]=${page}`

export const ANNOUNCEMENT_URL = (id: number) => `/announcements/${id}`
