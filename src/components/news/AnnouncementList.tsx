import { ARTICLES_PAGE_SIZE } from "@/config";
import useColors from "@/hooks/useColors";
import { StrapiArticle } from "@/types/strapi";
import { useCallback, useRef, useState } from "react";
import { Animated, FlatList, RefreshControl, View } from "react-native";
import { NewsItem } from "./Item";
import { LoadingSkeleton, PageLoadingSkeleton } from "./Skeletons";
import { ScrollToTop } from "./ScrollToTop";
import { useAnnouncements } from "@/hooks/announcements/useAnnouncements";

const AnimatedFlatList = Animated.createAnimatedComponent(
    FlatList
) as unknown as React.ComponentType<Animated.AnimatedProps<FlatList['props']> & {data: StrapiArticle[], ref?: React.RefObject<FlatList<StrapiArticle>>}>;

export const AnnouncementList = () => {
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const colors = useColors()
    const scrollY = useRef(new Animated.Value(0)).current
    const flatListRef = useRef<FlatList<StrapiArticle>>(null)
    
    const {
        data: announcementData,
        isLoading: announcementIsLoading,
        hasNextPage: announcementHasNextPage,
        fetchNextPage: announcementFetchNextPage,
        isFetchingNextPage: announcementIsFetchingNextPage,
        refetch: announcementRefetch,
    } = useAnnouncements({
        page: 1,
        pageSize: ARTICLES_PAGE_SIZE
    })

    // Handle article refresh
    const onAnnouncementRefresh = useCallback(() => {
        setRefreshing(true)
        announcementRefetch().finally(() => {
            setRefreshing(false)
        })
    }, [announcementRefetch])

    // Handle article pagination
    const onReachEnd = () => {
        // Fetch next page if there is one and it's not already fetching
        if (announcementHasNextPage && !announcementIsFetchingNextPage && !announcementIsLoading) {
            announcementFetchNextPage()
        }
    }

    const renderItem = useCallback(({ item, index }: { item: StrapiArticle; index: number }) => (
        <NewsItem
            item={item}
            index={index}
            activateTab="announcments" />
    ), [])

    return (
        announcementIsLoading ? (
            <PageLoadingSkeleton />
        ) : (
            <View className="flex-1 relative">
                <AnimatedFlatList
                    ref={flatListRef}
                    data={(announcementData?.pages.flatMap((page) => page.data) ?? []) as any as StrapiArticle[]}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => onReachEnd()}
                    onEndReachedThreshold={0.8}
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
                            onRefresh={onAnnouncementRefresh}
                            tintColor={colors.primary}
                            colors={[colors.primary]}
                            progressBackgroundColor={colors.backgroundSecondary}
                        />
                    }
                    ListFooterComponent={() => {
                        if (announcementIsFetchingNextPage) {
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