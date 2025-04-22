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
        // pageSize fixes the issue with the cache:
        // on index page open, it fetches the first page of articles and thought it was the the WHOLE first page,
        // when that was only 1 article
        queryKey: ["announcements", pageSize, 'list'],
        refetchOnMount: true,
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
    })

export const useAnnouncement = ({ id }: { id: string }) =>
    useQuery<SingleAnnouncementResponse>({
        queryKey: ["announcement", id],
        queryFn: async () => {
            const { data } = await api.get(ANNOUNCEMENT_URL(id))
            return data
        },
    })