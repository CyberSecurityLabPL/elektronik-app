import { StrapiEvent } from "@/types/strapi"

export interface EventsResponse {
  data: StrapiEvent[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface SingleEventResponse {
  data: StrapiEvent
  meta: {}
}
