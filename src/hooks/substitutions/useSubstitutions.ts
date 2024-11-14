import { SUBSTITUTIONS_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { useInfiniteQuery } from "@tanstack/react-query"
import { SubstitutionsResponse } from "./types"

export const useSubstitutions = ({ date }: { date: Date }) =>
  useInfiniteQuery<SubstitutionsResponse>({
    queryKey: ["substitutions", date],
    initialPageParam: 1,
    queryFn: async () => {
      const { data } = await api.get(SUBSTITUTIONS_URL(date))
      return data
    },
    getNextPageParam: (lastPage) => {
      const lastDate = lastPage.data[lastPage.data.length - 1]?.attributes.date
      return lastDate ? new Date(lastDate) : undefined
    },
    getPreviousPageParam: (firstPage) => {
      const firstDate = firstPage.data[0]?.attributes.date
      return firstDate ? new Date(firstDate) : undefined
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
  })
