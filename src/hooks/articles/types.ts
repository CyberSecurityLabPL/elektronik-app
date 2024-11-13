import { StrapiArticle } from "@/types/strapi"

export interface NewsResponse {
	data: StrapiArticle[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface SingleNewsResponse {
	data: StrapiArticle
	meta: {}
}
