import { StrapiAnnouncement } from "@/types/strapi"

export interface AnnouncementResponse {
  data: StrapiAnnouncement[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface SingleAnnouncementResponse {
  data: StrapiAnnouncement
  meta: {}
}
