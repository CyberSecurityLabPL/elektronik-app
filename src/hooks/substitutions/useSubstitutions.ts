import { SUBSTITUTIONS_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { SubstitutionsResponse } from "./types"
import { useQuery } from "@tanstack/react-query"

export const useSubstitutions = ({ date }: { date: Date }) =>
	useQuery<SubstitutionsResponse>({
		queryKey: ["substitutions"],
		queryFn: async () => {
			const { data } = await api.get(SUBSTITUTIONS_URL(date))
			return data
		},
	})
