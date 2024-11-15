import { EVENT_URL, EVENTS_URL, UPCOMING_EVENT_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { EventsResponse, SingleEventResponse } from "./types"

export const useEvents = ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) =>
  useInfiniteQuery<EventsResponse>({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await api.get(EVENTS_URL(page, pageSize))
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

export const useEvent = ({ id }: { id: number }) =>
  useQuery<SingleEventResponse>({
    queryKey: ["event"],
    queryFn: async () => {
      const { data } = await api.get(EVENT_URL(id))
      return data
    },
  })

export const useUpcomingEvent = ({ date }: { date: Date }) =>
  useQuery<EventsResponse>({
    queryKey: ["incomingEvent"],
    queryFn: async () => {
      const { data } = await api.get(UPCOMING_EVENT_URL(date))
      return data
    },
  })
