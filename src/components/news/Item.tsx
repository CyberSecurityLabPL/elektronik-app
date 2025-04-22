import { StrapiArticle } from "@/types/strapi"
import { memo } from "react"
import NewsCard from "../cards/NewsCard"
import { getStrapiImageUrl, localeFormat } from "@/lib/utils"
import { router } from "expo-router"

export const NewsItem = memo(({
    item,
    index,
    activateTab
}: {
    item: StrapiArticle,
    index: number,
    activateTab: 'articles' | 'announcments'
}) => {
    const isNew = () => {
        const createdDate = new Date(item.createdAt)
        const currentDate = new Date()
        const diffTime = currentDate.getTime() - createdDate.getTime()
        const diffDays = diffTime / (1000 * 60 * 60 * 24)
        return diffDays <= 3
    }

    return (
        <NewsCard
            date={localeFormat(item.createdAt, "dd MMMM")}
            image={
                item.image?.url
                    ? getStrapiImageUrl(item.image?.url)
                    : undefined
            }
            title={item.title}
            isFeatured={index === 0}
            isNew={isNew()}
            description={item.description}
            onPress={() =>
                router.navigate(`/news/${activateTab === 'articles' ? 'n' : 'a'}${item.documentId}`)
            }
        />
    )
})