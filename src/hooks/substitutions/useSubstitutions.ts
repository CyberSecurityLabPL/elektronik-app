import { SUBSTITUTIONS_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { SubstitutionsResponse } from "./types"

export const useSubstitutions = ({ date }: { date: Date }) => {
  const queryClient = useQueryClient()
  const queryKey = ["substitutions", date]

  const query = useInfiniteQuery<SubstitutionsResponse>({
    queryKey: ["substitutions", date],
    initialPageParam: 1,
    queryFn: async () => {
      const { data } = await api.get(SUBSTITUTIONS_URL(date))
      return data
    },
    getNextPageParam: (lastPage) => {
      const lastDate = lastPage.data[lastPage.data.length - 1]?.date
      return lastDate ? new Date(lastDate) : undefined
    },
    getPreviousPageParam: (firstPage) => {
      const firstDate = firstPage.data[0]?.date
      return firstDate ? new Date(firstDate) : undefined
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
  })

  const resetInfiniteQueryPagination = (): Promise<void> => {
    return new Promise((resolve) => {
      queryClient.setQueryData(
        queryKey,
        (oldData: { pages: string | any[]; pageParams: string | any[] }) => {
          if (!oldData) return undefined

          return {
            ...oldData,
            pages: oldData.pages.slice(0, 1),
            pageParams: oldData.pageParams.slice(0, 1),
          }
        },
      )
      queryClient.invalidateQueries({ queryKey }).then(() => {
        resolve()
      })
    })
  }

  return { ...query, resetInfiniteQueryPagination }
}
