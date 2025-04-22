import EventItem from "@/components/EventItem"
import { NoDataSvg, NoEventsSvg } from "@/components/icons"
import { Loader } from "@/components/Loader"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import { useEvents } from "@/hooks/events/useEvents"
import useColors from "@/hooks/useColors"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native"

const Events = () => {
  const colors = useColors()
  const {
    data,
    isRefetching,
    isLoading,
    isError,
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
        { isError
          ? (
            <Error
              isRefetching={isRefetching}
              refetch={refetch}
            />
          )
          : isLoading
              ? (
                <View className="flex items-center justify-center w-full h-full">
                  <Loader
                    color={colors.primary}
                    size={80}
                  />
                </View>
              )
              : (
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
                  keyExtractor={(item) => item.documentId}
                  data={allArticles}
                  ListHeaderComponent={
                    <View className="min-w-full">
                      <Heading title={t("Events.heading")} />
                    </View>
                  }
                  ListEmptyComponent={
                    <View className="flex flex-col items-center justify-center w-full h-96">
                      <NoEventsSvg />
                      <Text className="font-psemibold text-4xl text-foreground">
                        {t("Events.oops")}
                      </Text>
                      <Text className="font-pregular text-3xl text-foreground-secondary text-center">
                        {t("Events.noEvents")}
                      </Text>
                    </View>
                  }
                  renderItem={(props) => <EventItem {...props} t={t} />}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.5}
                />
              )
            }
      </View>
    </ScreenWrapper>
  )
}

export default Events

const Error = ({
  isRefetching,
  refetch,
}: {
  isRefetching: boolean,
  refetch: () => void,
}) => {
  const colors = useColors()
  const { t } = useTranslation()

  return (
      <ScrollView
          contentContainerClassName="w-full h-full flex flex-col items-center justify-center gap-y-8"
          showsVerticalScrollIndicator={false}
          refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor={colors.primary}
                colors={[colors.primary]}
                progressBackgroundColor={colors.backgroundSecondary}
              />
          }
      >
          <NoDataSvg
              height={250}
              width={'100%'}
          />
          <Text className="text-center px-4 text-foreground text-sm">{t('Error.noData')}</Text>
      </ScrollView>
  )
}