import { format } from "date-fns"

export const API_URL = "http://api.elektronik.zgora.pl/api"
export const BACKEND_URL = "http://api.elektronik.zgora.pl"
export const TIMETABLE_API_URL = "http://timetable.ddns.net:5678/api" //todo change to a proper url in prod

export const TIMETABLE_INFO_URL = (filter: string) => `/info/${filter}`
export const TIMETABLE_ALL_INFO_URL = () => `/info`
export const TIMETABLE_URL = (id: string) => `/timetables/${id}`

export const SUBSTITUTIONS_URL = (date: Date) =>
  `/substitutions?pagination[page]=1&pagination[pageSize]=1&sort[1]=createdAt:desc&filters[date][$eq]=${format(
    date,
    "yyyy-MM-dd",
  )}`

export const ARTICLES_URL = (page: number = 1, pageSize: number) =>
  `/articles?pagination[pageSize]=${pageSize}&pagination[page]=${page}`

export const ARTICLE_URL = (id: number) => `/articles/${id}`

export const EVENTS_URL = (page: number, pageSize: number) =>
  `/events?pagination[pageSize]=${pageSize}&pagination[page]=${page}&filters[date][$gte]=${
    new Date().toISOString().split("T")[0]
  }&sort[0]=date:asc`

export const EVENT_URL = (id: number) => `/events/${id}`

export const UPCOMING_EVENT_URL = (date: Date) =>
  `/events?pagination[pageSize]=1&pagination[page]=1&sort[1]=date:asc&filters[date][$gte]=${format(
    date,
    "yyyy-MM-dd",
  )}`

export const ANNOUNCEMENTS_URL = (page: number, pageSize: number) =>
  `/announcements?pagination[pageSize]=${pageSize}&pagination[page]=${page}`

export const ANNOUNCEMENT_URL = (id: number) => `/announcements/${id}`

export const BELLS_URL = () => `/bells?populate=*`
