import { ANNOUNCEMENT_URL, ANNOUNCEMENTS_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { AnnouncementResponse, SingleAnnouncementResponse } from "./types"

export const useAnnouncements = ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) =>
  useInfiniteQuery<AnnouncementResponse>({
    queryKey: ["announcements"],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(
        ANNOUNCEMENTS_URL(pageParam as number, pageSize),
      )
      return data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination
      return page < pageCount ? page + 1 : undefined
    },
    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.meta.pagination
      return page > 1 ? page - 1 : undefined
    },
    maxPages: 1,
  })

export const useAnnouncement = ({ id }: { id: number }) =>
  useQuery<SingleAnnouncementResponse>({
    queryKey: ["announcement"],
    queryFn: async () => {
      const { data } = await api.get(ANNOUNCEMENT_URL(id))
      return data
    },
  })
