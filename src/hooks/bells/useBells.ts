import { useQuery } from "@tanstack/react-query"
import { BellsResponse } from "./types"
import { BELLS_URL } from "@/constants/urls"
import { api } from "@/lib/axios"

export const useBells = () =>
  useQuery<BellsResponse>({
    queryKey: ["Bells"],
    queryFn: async () => {
      const { data } = await api.get(BELLS_URL())

      return data
    },
  })
