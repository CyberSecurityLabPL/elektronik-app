import NewsCard from "@/components/cards/NewsCard"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import { ARTICLES_PAGE_SIZE } from "@/config"
import { useAnnouncements } from "@/hooks/announcements/useAnnouncements"
import { useArticles } from "@/hooks/articles/useArticles"
import useColors from "@/hooks/useColors"
import {
  cn,
  getStrapiImageUrl,
  localeFormat,
  resetInfiniteQueryPagination,
} from "@/lib/utils"
import { StrapiArticle } from "@/types/strapi"
import { useScrollToTop } from "@react-navigation/native"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { router } from "expo-router"
import { ChevronUp } from "lucide-react-native"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Animated,
  Dimensions,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native"
import { useAnimatedRef } from "react-native-reanimated"

const News = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0)
  const listRef = useAnimatedRef<Animated.FlatList>()
  const colors = useColors()
  const { t, i18n } = useTranslation()

  useScrollToTop(listRef)

  const queryClient = useQueryClient()

  const onRefresh = useCallback(() => {
    setRefreshing(true),
      Promise.all([
        announcementRefetch(),
        articleRefetch(),
        resetInfiniteQueryPagination({
          queryKey: activeTab === 0 ? ["articles"] : ["announcements"],
          queryClient,
        }),
      ]).finally(() => {
        setRefreshing(false)
      })
  }, [])

  const slideAnim = useRef(new Animated.Value(0)).current

  const containerWidth = Dimensions.get("window").width - 24

  const tabWidth = (containerWidth - 32) / 2

  const MARGIN = 4
  const START_POSITION = MARGIN
  const END_POSITION = tabWidth + MARGIN

  const animateSlide = (toValue: number) => {
    Animated.spring(slideAnim, {
      toValue: toValue === 0 ? START_POSITION : END_POSITION,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start()
  }

  useEffect(() => {
    animateSlide(activeTab)
  }, [activeTab])

  const {
    data: articleData,
    isLoading: articleIsLoading,
    hasNextPage: articleHasNextPage,
    isFetchingNextPage: articleIsFetchingNextPage,
    fetchNextPage: articleFetchNextPage,
    refetch: articleRefetch,
  } = useArticles({
    page: 1,
    pageSize: ARTICLES_PAGE_SIZE,
  })
  const {
    data: announcementData,
    isLoading: announcementIsLoading,
    hasNextPage: announcementHasNextPage,
    isFetchingNextPage: announcementIsFetchingNextPage,
    fetchNextPage: announcementFetchNextPage,
    refetch: announcementRefetch,
  } = useAnnouncements({
    page: 1,
    pageSize: ARTICLES_PAGE_SIZE,
  })
  const allArticles = useMemo(() => {
    return articleData?.pages.flatMap((page) => page.data) ?? []
  }, [articleData?.pages])
  const allAnnouncements = useMemo(() => {
    return announcementData?.pages.flatMap((page) => page.data) ?? []
  }, [announcementData?.pages])

  const handleLoadMore = () => {
    if (activeTab === 0) {
      articleloadMore()
    } else {
      announcementloadMore()
    }
  }

  const announcementloadMore = () => {
    if (announcementHasNextPage && !announcementIsFetchingNextPage) {
      announcementFetchNextPage()
    }
  }
  const articleloadMore = () => {
    if (articleHasNextPage && !articleIsFetchingNextPage) {
      articleFetchNextPage()
    }
  }
  const renderItem = useCallback(
    ({ item, index }: { item: StrapiArticle; index: number }) => (
      <NewsItem item={item} index={index} activeTab={activeTab} />
    ),
    [activeTab],
  )
  return (
    <ScreenWrapper className="">
      <Heading title={t("News.heading")} />
      <View className="mt-6 bg-background-secondary h-16 rounded-2xl flex flex-row justify-around items-center px-2 relative overflow-hidden">
        {/* Animated Background */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: tabWidth - MARGIN * 2,
              height: 48,
              backgroundColor: "#6994ff",
              borderRadius: 12,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />

        {/* First Tab */}
        <Pressable
          onPress={() => setActiveTab(0)}
          className="w-1/2 h-12 flex justify-center items-center"
        >
          <Text
            className={cn(
              activeTab == 0 ? "text-white" : "text-zinc-600",
              "text-xl font-psemibold",
            )}
          >
            {t("News.tabs.school")}
          </Text>
        </Pressable>

        {/* Second Tab */}
        <Pressable
          onPress={() => setActiveTab(1)}
          className="w-1/2 h-12 flex justify-center items-center"
        >
          <Text
            className={cn(
              activeTab == 1 ? "text-white" : "text-zinc-600",
              "text-xl font-psemibold",
            )}
          >
            {t("News.tabs.council")}
          </Text>
        </Pressable>
      </View>
      <View className="p-4 bg-background-secondary w-full h-fit flex-1 mt-8 rounded-2xl ">
        {(activeTab === 0 ? articleIsLoading : announcementIsLoading) ? (
          <View className="flex-1 w-full p-4 gap-4">
            <View className="w-full  bg-background rounded-2xl animate-pulse">
              <View className="w-full h-48 dark:bg-zinc-500 bg-zinc-200 rounded-t-2xl " />
              <View className="w-full h-36 p-4 flex justify-between">
                <View>
                  <View className="w-4/5 h-6 dark:bg-zinc-500 bg-zinc-200 rounded-3xl " />
                  <View className=" w-3/5 h-3 dark:bg-zinc-500 bg-zinc-200 rounded-3xl mt-4" />
                </View>
                <View className="flex flex-row justify-between items-center w-full">
                  <View className="w-1/4 h-4 dark:bg-zinc-500 bg-zinc-200 rounded-3xl" />
                  <View className=" w-8 h-8 dark:bg-zinc-500 bg-zinc-200 rounded-full" />
                </View>
              </View>
            </View>
            <LoadingSkeleton />
          </View>
        ) : (
          <Animated.FlatList
            ref={listRef}
            onScroll={(event) => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y)
            }}
            className="  w-full"
            data={
              activeTab === 0
                ? allArticles
                : (allAnnouncements as any as StrapiArticle[])
            }
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20, gap: 16 }}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={3}
            renderItem={renderItem}
            ListFooterComponent={() =>
              (
                activeTab === 0
                  ? articleIsFetchingNextPage
                  : announcementIsFetchingNextPage
              ) ? (
                <View className="mt-4  w-full">
                  <LoadingSkeleton />
                </View>
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
                progressBackgroundColor={colors.backgroundSecondary}
              />
            }
          />
        )}
        <View
          className={cn(
            "absolute bottom-16  left-1/2 -translate-x-1/2 ml-4 transition-all",
            contentVerticalOffset > 1000
              ? "translate-y-0 opacity-1 "
              : "translate-y-24 opacity-0",
          )}
        >
          <IconButton
            LucideIcon={ChevronUp}
            iconColor={"#FFF"}
            className="bg-primary"
            onPress={() => listRef.current?.scrollToOffset({ offset: 0 })}
          />
        </View>
        {/* ) : null} */}
      </View>
    </ScreenWrapper>
  )
}

export default News

const LoadingSkeleton = () => (
  <View className=" w-full h-48 bg-background rounded-xl animate-pulse flex flex-row gap-2">
    <View className="w-2/5 h-full pt-4 dark:bg-zinc-500 bg-zinc-200  rounded-l-2xl"></View>
    <View className="w-3/5 p-4">
      <View className="w-5/6 h-6  dark:bg-zinc-500 bg-zinc-200  rounded-3xl" />
      <View className="mt-4 w-3/4 h-5 dark:bg-zinc-500 bg-zinc-200  rounded-full" />
      <View className="mt-2 w-1/2 h-4 dark:bg-zinc-500 bg-zinc-200  rounded-full" />
    </View>
  </View>
)
const NewsItem = memo(
  ({
    item,
    index,
    activeTab,
  }: {
    item: StrapiArticle
    index: number
    activeTab: number
  }) => (
    <NewsCard
      date={localeFormat(item.attributes.createdAt, "dd MMMM")}
      image={
        item.attributes.image?.data?.attributes?.url
          ? getStrapiImageUrl(item.attributes.image.data.attributes.url)
          : undefined
      }
      title={item.attributes.title}
      isFeatured={index === 0}
      description={item.attributes.description}
      onPress={() =>
        router.push(`/(drawer)/(news)/${activeTab === 1 ? "a" : "n"}${item.id}`)
      }
    />
  ),
)
