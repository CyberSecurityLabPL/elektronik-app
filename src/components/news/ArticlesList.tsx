import { ARTICLES_PAGE_SIZE } from "@/config";
import { useArticles } from "@/hooks/articles/useArticles";
import useColors from "@/hooks/useColors";
import { StrapiArticle } from "@/types/strapi";
import { useCallback, useRef, useState } from "react";
import { Animated, FlatList, RefreshControl, View } from "react-native";
import { NewsItem } from "./Item";
import { LoadingSkeleton, PageLoadingSkeleton } from "./Skeletons";
import { ScrollToTop } from "./ScrollToTop";

const AnimatedFlatList = Animated.createAnimatedComponent(
    FlatList
) as unknown as React.ComponentType<Animated.AnimatedProps<FlatList['props']> & {data: StrapiArticle[], ref?: React.RefObject<FlatList<StrapiArticle>>}>;

export const ArticleList = () => {
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const colors = useColors()
    const scrollY = useRef(new Animated.Value(0)).current
    const flatListRef = useRef<FlatList<StrapiArticle>>(null)
    
    const {
        data: articleData,
        isLoading: articleIsLoading,
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
        articleIsLoading ? (
            <PageLoadingSkeleton />
        ) : (
            <View className="flex-1 relative">
                <AnimatedFlatList
                    ref={flatListRef}
                    data={articleData?.pages.flatMap(page => page.data) || []}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => onReachEnd()}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item: unknown) => (item as StrapiArticle).id.toString()}
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