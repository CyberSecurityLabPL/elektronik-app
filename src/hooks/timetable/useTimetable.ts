import { TIMETABLE_INFO_URL, TIMETABLE_URL } from "@/constants/urls"
import { timetableApi } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { TimetableInfoResponse, TimetableResponse } from "./types"

export const useTimetableInfo = () =>
  useQuery<TimetableInfoResponse>({
    queryKey: ["timetable-info"],
    queryFn: async () => {
      const { data } = await timetableApi.get(TIMETABLE_INFO_URL())

      return data
    },
  })

export const useTimetable = ({ id }: { id: string }) =>
  useQuery<TimetableResponse>({
    queryKey: ["timetable"],
    queryFn: async () => {
      const { data } = await timetableApi.get(TIMETABLE_URL(id))

      return data
    },
  })
