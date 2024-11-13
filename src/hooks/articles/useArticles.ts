import { ARTICLE_URL, ARTICLES_URL } from "@/constants/urls"
import { api } from "@/lib/axios"
import { NewsResponse, SingleNewsResponse } from "./types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useArticles = ({
	page,
	pageSize,
}: {
	page: number
	pageSize: number
}) =>
	useQuery<NewsResponse>({
		queryKey: ["articles"],
		queryFn: async () => {
			const { data } = await api.get(ARTICLES_URL(page, pageSize))
			return data
		},
	})

export const useArticle = ({ id }: { id: number }) =>
	useQuery<SingleNewsResponse>({
		queryKey: ["article"],
		queryFn: async () => {
			const { data } = await api.get(ARTICLE_URL(id))
			return data
		},
	})
