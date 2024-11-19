import {
  TIMETABLE_ALL_INFO_URL,
  TIMETABLE_INFO_URL,
  TIMETABLE_URL,
} from "@/constants/urls"
import { timetableApi } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { TimetableInfoResponse, TimetableResponse } from "./types"

export const useTimetableInfo = ({ filter }: { filter: string }) =>
  useQuery<TimetableInfoResponse>({
    queryKey: [`timetable-info-filtered-${filter}`],
    queryFn: async () => {
      const { data } = await timetableApi.get(TIMETABLE_INFO_URL(filter))

      return data
    },
  })
export const useTimetableAllInfo = () =>
  useQuery<TimetableInfoResponse>({
    queryKey: ["timetable-all-info"],
    queryFn: async () => {
      const { data } = await timetableApi.get(TIMETABLE_ALL_INFO_URL())

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
