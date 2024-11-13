export interface SubstitutionsResponse {
	data: {
		id: number
		attributes: {
			date: string
			substitutions: string
			createdAt: string | Date
			updatedAt: string | Date
			publishedAt: string | Date
		}
	}[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}
