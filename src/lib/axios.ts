import {
	NewsResponse,
	SingleNewsResponse,
	SubstitutionsResponse,
} from "@/types/axios"
import axios from "axios"
import { format } from "date-fns"

export const api = axios.create({
	baseURL: "http://api.elektronik.zgora.pl/api",
	headers: {
		"Content-Type": "application/json",
	},
})

export async function getSubstitutions(
	date: Date,
): Promise<SubstitutionsResponse | undefined> {
	try {
		const data = await api.get(
			`/substitutions?pagination[page]=1&pagination[pageSize]=1&sort[1]=createdAt:desc&filters[date][$eq]=${format(
				date,
				"yyyy-MM-dd",
			)}`,
		)

		return data.data
	} catch (error) {}
}

export async function getNews(
	page: number,
	pageSize: number,
): Promise<NewsResponse | undefined> {
	try {
		const data = await api.get(
			`/articles?pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
		)

		return data.data
	} catch (error) {}
}

export async function getArticle(
	id: number,
): Promise<SingleNewsResponse | undefined> {
	try {
		const data = await api.get(`/articles/${id}`)

		return data.data
	} catch (error) {}
}
