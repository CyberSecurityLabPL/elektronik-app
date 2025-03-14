import { api, timetableApi } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ValidDateResponse } from "./types";
import { TIMETABLE_VALID_DATE } from "@/constants/urls";

/**
 * Hook for fetching time of last timetable update
 * @returns {string} date in dd.mm.yyyy
 */
export const useTimetableValidDate = () =>
    useQuery<ValidDateResponse, AxiosError>({
        queryKey: ['valid-date'],
        queryFn: async (): Promise<ValidDateResponse> => {
            const { data } = await timetableApi.get<ValidDateResponse>(TIMETABLE_VALID_DATE());
            return data;
        },
        staleTime: 1000 * 60 * 60 * 24 * 1,
    });