import { EVENT_URL, EVENTS_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { EventsResponse, SingleEventResponse } from "./types"
import { useQuery } from "@tanstack/react-query"

export const useEvents = ({
	page,
	pageSize,
}: {
	page: number
	pageSize: number
}) =>
	useQuery<EventsResponse>({
		queryKey: ["events"],
		queryFn: async () => {
			const { data } = await api.get(EVENTS_URL(page, pageSize))
			return data
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
