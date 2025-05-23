import NewsCard from "@/components/cards/NewsCard"
import { getStrapiImageUrl } from "@/lib/utils"
import { StrapiAnnouncement, StrapiArticle } from "@/types/strapi"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { router } from "expo-router"

export const Article = ({
  item: article,
  index,
}: {
  item: StrapiArticle
  index: number
}) => {
  const newsCardProps = {
    key: article.documentId,
    isNew:
      format(
        new Date(
          article.customDate
            ? article.customDate
            : article.createdAt,
        ),
        "d LLLL",
        {
          locale: pl,
        },
      ) ===
      format(new Date(), "d LLLL", {
        locale: pl,
      }),
    date: format(
      new Date(
        article.customDate
          ? article.customDate
          : article.createdAt,
      ),
      "d LLLL",
      {
        locale: pl,
      },
    ),
    title: article.title,
    image: article.image?.url
      ? getStrapiImageUrl(article.image?.url)
      : "https://images.unsplash.com/photo-1598557360303-bc7efa2ffa81?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    onPress: () => router.navigate(`/news/n${article.documentId}`),
  }

  return index === 0 ? (
    <NewsCard
      isFeatured
      description={article.description}
      {...newsCardProps}
    />
  ) : (
    <NewsCard {...newsCardProps} />
  )
}

export const Announcement = ({
  item: article,
  index,
}: {
  item: StrapiAnnouncement
  index: number
}) => {
  const newsCardProps = {
    key: article.documentId,
    isNew:
      format(new Date(article.createdAt), "d LLLL", {
        locale: pl,
      }) ===
      format(new Date(), "d LLLL", {
        locale: pl,
      }),
    date: format(new Date(article.createdAt), "d LLLL", {
      locale: pl,
    }),
    title: article.title,
    image: article.image?.url
      ? getStrapiImageUrl(article.image?.url)
      : "https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    onPress: () => router.navigate(`/news/a${article.documentId}`),
  }

  return index === 0 ? (
    <NewsCard
      isFeatured
      description={article.description}
      {...newsCardProps}
    />
  ) : (
    <NewsCard {...newsCardProps} />
  )
}
