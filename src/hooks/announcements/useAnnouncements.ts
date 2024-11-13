import { ANNOUNCEMENT_URL, ANNOUNCEMENTS_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { AnnouncementResponse, SingleAnnouncementResponse } from "./types"

export const useAnnouncements = ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) =>
  useQuery<AnnouncementResponse>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await api.get(ANNOUNCEMENTS_URL(page, pageSize))
      return data
    },
  })

export const useAnnouncement = ({ id }: { id: number }) =>
  useQuery<SingleAnnouncementResponse>({
    queryKey: ["announcement"],
    queryFn: async () => {
      const { data } = await api.get(ANNOUNCEMENT_URL(id))
      return data
    },
  })
