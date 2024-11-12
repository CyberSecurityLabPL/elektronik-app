export interface StrapiImage {
	data: {
		id: number
		attributes: {
			name: string
			alternativeText: string | null
			caption: string | null
			width: number
			height: number
			formats: any
			hash: string
			ext: string
			mime: string
			size: number
			url: string
			previewUrl: string | null
			provider: string
			provider_metadata: any
			createdAt: string | Date
			updatedAt: string | Date
		}
	}
}

export interface StrapiArticle {
	id: number
	attributes: {
		title: string
		description: string
		content: string
		customDate: string | Date | null
		createdAt: string | Date
		publishedAt: string | Date
		image: StrapiImage
	}
}

export interface StrapiEvent {
	id: number
	attributes: {
		title: string
		date: string
		type: "Zawody Szkolne" | "Święto" | "Uroczystości"
		description: string
		createdAt: string | Date
		updatedAt: string | Date
		publishedAt: string | Date
	}
}

export interface StrapiAnnouncement {
	id: number
	attributes: {
		title: string
		description: string
		content: string
		image: StrapiImage
		createdAt: string | Date
		updatedAt: string | Date
		publishedAt: string | Date
	}
}

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

export interface EventsResponse {
	data: StrapiEvent[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface SingleEventResponse {
	data: StrapiEvent
	meta: {}
}

export interface AnnouncementResponse {
	data: StrapiAnnouncement[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface SingleAnnouncementResponse {
	data: StrapiAnnouncement
	meta: {}
}
