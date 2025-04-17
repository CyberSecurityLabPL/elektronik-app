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
        const createdDate = new Date(item.attributes.createdAt)
        const currentDate = new Date()
        const diffTime = currentDate.getTime() - createdDate.getTime()
        const diffDays = diffTime / (1000 * 60 * 60 * 24)
        return diffDays <= 3
    }

    return (
        <NewsCard
            date={localeFormat(item.attributes.createdAt, "dd MMMM")}
            image={
                item.attributes.image?.data?.attributes?.url
                    ? getStrapiImageUrl(item.attributes.image.data.attributes.url)
                    : undefined
            }
            title={item.attributes.title}
            isFeatured={index === 0}
            isNew={isNew()}
            description={item.attributes.description}
            onPress={() =>
                router.navigate(`/news/${activateTab === 'articles' ? 'n' : 'a'}${item.id}`)
            }
        />
    )
})