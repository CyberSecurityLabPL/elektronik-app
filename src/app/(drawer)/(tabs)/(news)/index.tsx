import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import Tabs from "@/components/ui/Tabs"
import { useAnnouncements } from "@/hooks/announcements/useAnnouncements"
import { useArticles } from "@/hooks/articles/useArticles"
import { useMemo, useState } from "react"
import { FlatList, RefreshControl, View } from "react-native"
import { Announcement, Article } from "../../../../components/NewsListItems"

const News = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <ScreenWrapper>
      <View className="flex flex-col gap-4 items-center">
        {activeTab === 0 ? (
          <View>
            <Articles activeTab={activeTab} setActiveTab={setActiveTab} />
          </View>
        ) : (
          <View>
            <Announcements activeTab={activeTab} setActiveTab={setActiveTab} />
          </View>
        )}
      </View>
    </ScreenWrapper>
  )
}

export default News

function Articles({
  activeTab,
  setActiveTab,
}: {
  activeTab: number
  setActiveTab: (n: number) => void
}) {
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useArticles({
    page: 1,
    pageSize: 3,
  })

  const allArticles = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? []
  }, [data?.pages])

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      contentContainerClassName="flex flex-col items-center gap-4 pb-16"
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      data={allArticles}
      ListHeaderComponent={
        <View className="gap-6">
          <Heading title="Ogłoszenia" />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
      }
      renderItem={Article}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  )
}

function Announcements({
  activeTab,
  setActiveTab,
}: {
  activeTab: number
  setActiveTab: (n: number) => void
}) {
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useAnnouncements({
    page: 1,
    pageSize: 3,
  })

  const allArticles = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? []
  }, [data?.pages])

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      contentContainerClassName="flex flex-col items-center gap-4 pb-16"
      showsVerticalScrollIndicator={false}
      data={allArticles}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View className="gap-6">
          <Heading title="Ogłoszenia" />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
      }
      renderItem={Announcement}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  )
}
