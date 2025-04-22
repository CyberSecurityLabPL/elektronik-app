import { ARTICLES_PAGE_SIZE } from "@/config";
import { useArticles } from "@/hooks/articles/useArticles";
import useColors from "@/hooks/useColors";
import { StrapiArticle } from "@/types/strapi";
import { useCallback, useRef, useState } from "react";
import { Text, Animated, FlatList, RefreshControl, ScrollView, View } from "react-native";
import { NewsItem } from "./Item";
import { LoadingSkeleton, PageLoadingSkeleton } from "./Skeletons";
import { ScrollToTop } from "./ScrollToTop";
import { NoDataSvg } from "../icons";
import { useTranslation } from "react-i18next";

export const ArticleList = () => {
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const colors = useColors()
    const { t } = useTranslation()
    const scrollY = useRef(new Animated.Value(0)).current
    const flatListRef = useRef<FlatList<StrapiArticle>>(null)

    const {
        data: articleData,
        isLoading: articleIsLoading,
        isError: articleIsError,
        hasNextPage: articleHasNextPage,
        fetchNextPage: articleFetchNextPage,
        isFetchingNextPage: articleIsFetchingNextPage,
        refetch: articleRefetch,
    } = useArticles({
        page: 1,
        pageSize: ARTICLES_PAGE_SIZE
    })

    // Handle article refresh
    const onArticleRefresh = useCallback(() => {
        setRefreshing(true)
        articleRefetch().finally(() => {
            setRefreshing(false)
        })
    }, [articleRefetch])

    // Handle article pagination
    const onReachEnd = () => {
        // Fetch next page if there is one and it's not already fetching
        if (articleHasNextPage && !articleIsFetchingNextPage && !articleIsLoading) {
            articleFetchNextPage()
        }
    }

    const renderItem = useCallback(({ item, index }: { item: StrapiArticle; index: number }) => (
        <NewsItem
            item={item}
            index={index}
            activateTab="articles" />
    ), [])

    return (
        articleIsLoading
            ? (
                <PageLoadingSkeleton />
            )
            : articleIsError
                ? (
                    <ScrollView
                        contentContainerClassName="w-full h-full flex flex-col items-center justify-center gap-y-8"
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onArticleRefresh}
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
                : (
                    <View className="flex-1 relative">
                        <Animated.FlatList
                            ref={flatListRef}
                            data={articleData?.pages.flatMap(page => page.data) || []}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => onReachEnd()}
                            onEndReachedThreshold={0.5}
                            keyExtractor={(item: unknown) => (item as StrapiArticle).documentId.toString()}
                            initialNumToRender={3}
                            maxToRenderPerBatch={5}
                            windowSize={10}
                            removeClippedSubviews={true}
                            updateCellsBatchingPeriod={50}
                            renderItem={renderItem}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingBottom: 20, gap: 16 }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onArticleRefresh}
                                    tintColor={colors.primary}
                                    colors={[colors.primary]}
                                    progressBackgroundColor={colors.backgroundSecondary}
                                />
                            }
                            ListFooterComponent={() => {
                                if (articleIsFetchingNextPage) {
                                    return (
                                        <View className="mt-4  w-full">
                                            <LoadingSkeleton />
                                        </View>
                                    )
                                }
                                return null
                            }}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )}
                        />
                        <ScrollToTop
                            scrollY={scrollY}
                            listRef={flatListRef}
                        />
                    </View>
                )
    )
}