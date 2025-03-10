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
  useInfiniteQuery<NewsResponse>({
    // pageSize fixes the issue with the cache:
    // on index page open, it fetches the first page of articles and thought it was the the WHOLE first page,
    // when that was only 1 article
    queryKey: ["articles", pageSize, 'list'],
    refetchOnMount: true,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(
        ARTICLES_URL(pageParam as number, pageSize),
      )
      return data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination
      return page < pageCount ? page + 1 : undefined
    },
    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.meta.pagination
      return page > 1 ? page - 1 : undefined
    },
  })

export const useArticle = ({ id }: { id: number }) =>
  useQuery<SingleNewsResponse>({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data } = await api.get(ARTICLE_URL(id))
      return data
    },
  })