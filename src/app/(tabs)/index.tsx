import HomeCard from "@/components/cards/HomeCard"
import { BellsBlock } from "@/components/index-page/Bells"
import { LabelLuckyNumber } from "@/components/LuckyNumber"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import Modal from "@/components/ui/Modal"
import { DAYS_BEFORE_EVENT } from "@/config"
import { useAnnouncements } from "@/hooks/announcements/useAnnouncements"
import { useArticles } from "@/hooks/articles/useArticles"
import { useBells } from "@/hooks/bells/useBells"
import { useUpcomingEvent } from "@/hooks/events/useEvents"
import { useLuckyNumber } from "@/hooks/lucky-number/useLuckyNumber"
import useColors from "@/hooks/useColors"
import { useUserData } from "@/hooks/useUserData"
import { localeFormat } from "@/lib/utils"
import { useNetInfo } from "@react-native-community/netinfo"
import { differenceInDays } from "date-fns"
import { useRouter } from "expo-router"
import { X } from "lucide-react-native"
import React, { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native"

const Home = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [isEventModalOpen, setIsEventModalOpen] = useState(false)

    const { isConnected } = useNetInfo()

    const colors = useColors()
    const userData = useUserData()
    const curDate = new Date()
    const { t } = useTranslation()

    const {
        data: article,
        refetch: refetchArticles,
        isLoading: isArticlesLoading,
        isRefetching: isArticlesRefetching,
    } = useArticles({
        page: 1,
        pageSize: 1,
    })
    const {
        data: announcement,
        refetch: refetchAnnouncements,
        isLoading: isAnnouncementsLoading,
        isRefetching: isAnnouncementsRefetching,
    } = useAnnouncements({
        page: 1,
        pageSize: 1
    })

    const { data: event, refetch: refetchEvents } = useUpcomingEvent({
        date: curDate,
    })

    const { refetch: refetchBells } = useBells()

    const router = useRouter()

    const { refetch: refetchLuckyNumber } = useLuckyNumber()

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        Promise.all([
            refetchArticles(),
            refetchAnnouncements(),
            refetchEvents(),
            refetchBells(),
            refetchLuckyNumber(),
        ]).finally(() => {
            setRefreshing(false)
        })
    }, [refetchArticles, refetchAnnouncements, refetchEvents, refetchBells])


    return (
        <ScreenWrapper>
            <ScrollView
                contentContainerClassName="mb-12"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.primary}
                        colors={[colors.primary]}
                        progressBackgroundColor={colors.backgroundSecondary}
                    />
                }
            >
                <Heading
                    title={userData ? userData.name : t("Home.heading")}
                    screen="home"
                />
                <BellsBlock />
                {isConnected && <LabelLuckyNumber />}
{/* 
                <View className="my-6">
                    {event?.data[0] &&
                        differenceInDays(new Date(event.data[0].attributes.date), curDate) <
                        DAYS_BEFORE_EVENT && (
                            <>
                                <HomeCard
                                    type="event"
                                    date={
                                        event?.data[0].attributes.date
                                            ? localeFormat(
                                                new Date(event.data[0].attributes.date),
                                                "dd MMMM ",
                                            )
                                            : "Invalid date"
                                    }
                                    title={event?.data[0].attributes.title!}
                                    onPress={() => setIsEventModalOpen(true)}
                                />
                            </>
                        )}
                </View> */}

                {/* {event?.data[0] && (
                    <Modal id="event" isOpen={isEventModalOpen} onClose={() => {}}>
                        <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background py-6 h-1/2">
                            <Pressable
                                onPress={(e) => e.stopPropagation()}
                                className=" justify-between items-center h-full px-8 w-full"
                            >
                                <View className="w-full  py-1">
                                    <Text className="text-2xl text-foreground font-pmedium text-left ">
                                        {event?.data[0].attributes.title}
                                    </Text>
                                </View>
                                <ScrollView
                                    className="w-full "
                                    nestedScrollEnabled={true}
                                    showsVerticalScrollIndicator={true}
                                >
                                    <TouchableOpacity>
                                        <TouchableWithoutFeedback>
                                            <Text className="text-base text-foreground-secondary text-wrap mt-2">
                                                {event?.data[0].attributes.description}
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </TouchableOpacity>
                                </ScrollView>
                                <IconButton
                                    LucideIcon={X}
                                    iconColor={colors.foreground}
                                    onPress={() => setIsEventModalOpen(false)}
                                    className="mt-4"
                                />
                            </Pressable>
                        </View>
                    </Modal>
                )} */}

                <Text className="text-foreground text-xl font-psemibold ">
                    {t("Home.announcements")}
                </Text>
                <View className="mt-4 flex flex-col gap-6 mb-14">
                    { (!(isArticlesLoading || isArticlesRefetching) && article)
                        ? (
                            <HomeCard
                                type="council"
                                onPress={() =>
                                    router.navigate({
                                        pathname: `/news/[id]`,
                                        params: { id: `n${article.pages[0].data[0].documentId}`, origin: "home", other: "other" },
                                    })
                                }
                                description={article.pages[0].data[0].description}
                                date={
                                    article?.pages[0].data[0].createdAt
                                        ? localeFormat(
                                            new Date(
                                                article.pages[0].data[0].createdAt,
                                            ),
                                            "dd MMMM "
                                        )
                                        : "Brak daty"
                                }
                                title={article.pages[0].data[0].title}
                            />
                        )
                        : <NewsSkeleton />
                    }
                    
                    { (!(isAnnouncementsLoading || isAnnouncementsRefetching) && announcement)
                        ? (
                            <HomeCard
                                type="school"
                                onPress={() =>
                                    router.navigate({
                                        pathname: `/news/[id]`,
                                        params: { id: `a${announcement.pages[0].data[0].documentId}`, origin: "home", other: "other" },
                                    })
                                }
                                description={announcement.pages[0].data[0].description}
                                date={
                                    announcement.pages[0].data[0].createdAt
                                        ? localeFormat(
                                            new Date(
                                                announcement.pages[0].data[0].createdAt,
                                            ),
                                            "dd MMMM "
                                        )
                                        : "Brak daty"
                                }
                                title={announcement.pages[0].data[0].title}
                            />
                        )
                        : <NewsSkeleton />}

                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Home

const NewsSkeleton = memo(() => (
    <View className="h-[225px] w-full rounded-2xl bg-background-secondary animate-pulse" />
))