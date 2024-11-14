import HomeCard from "@/components/cards/HomeCard"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import Modal from "@/components/ui/Modal"
import config from "@/config"
import { useAnnouncements } from "@/hooks/announcements/useAnnouncements"
import { useArticles } from "@/hooks/articles/useArticles"
import { useBells } from "@/hooks/bells/useBells"
import { useEvents } from "@/hooks/events/useEvents"
import useColors from "@/hooks/useColors"
import useTimeLessons from "@/hooks/useTimeLessons"
import { useUserData } from "@/hooks/useUserData"
import { cn } from "@/lib/utils"
import { Lesson } from "@/types/strapi"
import { differenceInDays, format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { router } from "expo-router"
import { X } from "lucide-react-native"
import { useCallback, useMemo, useState } from "react"
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native"

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [isBellModalOpen, setIsBellModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  const colors = useColors()
  const userData = useUserData()
  const curDate = new Date()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const { data: article } = useArticles({ page: 1, pageSize: 1 })
  const { data: announcement } = useAnnouncements({ page: 1, pageSize: 1 })
  const { data: event } = useEvents({ page: 1, pageSize: 1 })
  const { data: bells } = useBells({ page: 1, pageSize: 1 })
  const lessons = useMemo(() => {
    return Object.values(bells?.data[0]?.attributes ?? {}).filter(
      (item) => typeof item === "object" && item !== null && "id" in item,
    ) as Lesson[]
  }, [bells])
  const { minutes, message } = useTimeLessons({ lessons })
  console.log(minutes, message)

  return (
    <ScreenWrapper>
      <ScrollView
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
          title={userData ? userData.name : "Miło Cię widzieć"}
          homeScreen
        />

        <Pressable
          onPress={() => setIsBellModalOpen(true)}
          className="flex flex-row mt-6 "
        >
          <View className="bg-background-secondary rounded-3xl   p-6 gap-4 w-1/2">
            <Text className="font-pregular text-foreground text-left text-lg  ">
              {message}
            </Text>
          </View>
          <View className="w-1/2 flex justify-center items-center flex-col">
            <Text className="text-primary font-psemibold text-2xl flex-wrap  text-center ">
              {minutes == 0 ? "😴" : minutes}
            </Text>
            <Text
              className={cn(
                minutes == 0 ? "hidden" : "flex",
                "text-primary font-pregular text-xl  text-center",
              )}
            >
              minut
            </Text>
          </View>
        </Pressable>
        <Modal
          isOpen={isBellModalOpen}
          onClose={() => setIsBellModalOpen(false)}
        >
          <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background">
            <View className="py-4">
              <Text className="text-xl text-foreground font-pmedium text-center mb-4">
                Dzwonki
              </Text>

              {lessons.map((lesson, index) => (
                <Text
                  className="text-foreground text-center text-xl "
                  key={index}
                >
                  {`${index}. `}
                  {lesson.startDate.toString().slice(0, -7)}
                  {"  "}-{"  "}
                  {lesson.endDate.toString().slice(0, -7)}
                </Text>
              ))}
            </View>
            <IconButton
              LucideIcon={X}
              iconColor={colors.foreground}
              onPress={() => setIsBellModalOpen(false)}
              className="my-4"
            />
          </View>
        </Modal>
        <View className="my-6">
          {event?.pages[0].data[0].attributes.date &&
            differenceInDays(
              new Date(event.pages[0].data[0].attributes.date),
              curDate,
            ) < config.DAYS_BEFORE_EVENT && (
              <HomeCard
                type="event"
                date={
                  event?.pages[0].data[0].attributes.date
                    ? format(
                        new Date(event.pages[0].data[0].attributes.date),
                        "dd MMMM ",
                        { locale: pl },
                      )
                    : "Invalid date"
                }
                title={event?.pages[0].data[0].attributes.title!}
              />
            )}
        </View>

        <Text className="text-foreground text-xl font-psemibold ">
          Ogłoszenia
        </Text>
        <View className="mt-4 flex flex-col gap-6 mb-8">
          <HomeCard
            type="school"
            onPress={() =>
              router.push(`/(tabs)/(news)/n${article?.pages[0].data[0].id}`)
            }
            description={article?.pages[0].data[0].attributes.description!}
            date={
              article?.pages[0].data[0].attributes.createdAt
                ? format(
                    new Date(
                      article?.pages[0].data[0].attributes.createdAt ?? "",
                    ),
                    "dd MMMM ",
                    { locale: pl },
                  )
                : "Brak daty"
            }
            title={article?.pages[0].data[0].attributes.title!}
          />
          <HomeCard
            type="council"
            onPress={() =>
              router.push(
                `/(tabs)/(news)/a${announcement?.pages[0].data[0].id}`,
              )
            }
            description={announcement?.pages[0].data[0].attributes.description!}
            date={
              announcement?.pages[0].data[0].attributes.createdAt
                ? format(
                    new Date(
                      announcement?.pages[0].data[0].attributes.createdAt ?? "",
                    ),
                    "dd MMMM",
                    { locale: pl },
                  )
                : "Brak daty"
            }
            title={announcement?.pages[0].data[0].attributes.title!}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Home
