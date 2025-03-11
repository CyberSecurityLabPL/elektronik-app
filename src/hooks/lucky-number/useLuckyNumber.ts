import { LUCKY_NUMBER_URL } from "@/constants/urls";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { LuckyNumberData } from "./types";
import { AxiosError } from "axios";

/**
 * Hook for fetching the current lucky number
 * @returns Query result with typed lucky number data
 */
export const useLuckyNumber = () =>
    useQuery<LuckyNumberData, AxiosError>({
        queryKey: ['lucky-number'],
        queryFn: async (): Promise<LuckyNumberData> => {
            const { data } = await api.get<LuckyNumberData>(LUCKY_NUMBER_URL());
            return data;
        },
        staleTime: 1000 * 60 * 60,
    });