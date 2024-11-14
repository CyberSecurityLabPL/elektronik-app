import { StrapiBell, StrapiEvent } from "@/types/strapi"

export interface BellsResponse {
  data: StrapiBell[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
