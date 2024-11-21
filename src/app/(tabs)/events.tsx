import EventItem from "@/components/EventItem"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import { useEvents } from "@/hooks/events/useEvents"
import useColors from "@/hooks/useColors"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, RefreshControl, View } from "react-native"

const Events = () => {
  const colors = useColors()
  const {
    data,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useEvents({
    page: 1,
    pageSize: 3,
  })

  const allArticles = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? []
  }, [data?.pages])
  const { t } = useTranslation()
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }
  return (
    <ScreenWrapper>
      <View className="flex flex-col items-center w-full">
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={colors.primary}
              colors={[colors.primary]}
              progressBackgroundColor={colors.backgroundSecondary}
            />
          }
          contentContainerClassName="gap-4 pb-16 w-full"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyExtractor={(item) => item.id.toString()}
          data={allArticles}
          ListHeaderComponent={
            <View className="min-w-full">
              <Heading title={t("Events.heading")} />
            </View>
          }
          renderItem={(props) => <EventItem {...props} t={t} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Events
