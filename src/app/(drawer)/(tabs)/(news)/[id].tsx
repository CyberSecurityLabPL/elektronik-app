import DefaultBanner from "@/components/svgs/DefaultBanner"
import IconButton from "@/components/ui/IconButton"
import { useAnnouncement } from "@/hooks/announcements/useAnnouncements"
import { SingleNewsResponse } from "@/hooks/articles/types"
import { useArticle } from "@/hooks/articles/useArticles"
import useColors from "@/hooks/useColors"
import { getStrapiImageUrl } from "@/lib/utils"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { router, Stack, useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { ChevronLeft } from "lucide-react-native"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated"

export default function ArticleScreen() {
  const { id } = useLocalSearchParams()
  const colors = useColors()
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)
  const [key, setKey] = useState(0)

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false })
    scrollOfset.value = 0
    setKey((prev) => prev + 1)
  }, [id])

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-256, 0, 256],
            [-256 / 2, 0, 256 * 0.75],
          ),
        },
      ],
    }
  })
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOfset.value, [0, 256 / 2], [1, 0.7]),
    }
  })

  const { data, isLoading, isError } = id.includes("n")
    ? useArticle({ id: Number(id.slice(1)) })
    : useAnnouncement({ id: Number(id.slice(1)) })

  return (
    <View className="px-0 pt-0 relative bg-background">
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerLeft: () => (
            <Animated.View style={headerAnimatedStyle} className="mt-4">
              <IconButton
                LucideIcon={ChevronLeft}
                iconColor={colors.foreground}
                onPress={() => router.back()}
              />
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={16}
        key={`${id}-${key}`}
      >
        {data?.data.attributes.image.data ? (
          <Animated.Image
            source={{
              uri: getStrapiImageUrl(
                data?.data.attributes.image.data.attributes.url,
              ),
            }}
            style={[
              { width: "auto", height: 256, paddingBottom: 32 },
              imageAnimatedStyle,
            ]}
          />
        ) : (
          <Animated.View
            style={[{ height: 256, paddingBottom: 32 }, imageAnimatedStyle]}
          >
            <DefaultBanner />
          </Animated.View>
        )}

        <View
          className="gap-12 w-full py-4 min-h-screen flex flex-col justify-start   bg-background px-6 rounded-3xl"
          style={{
            marginTop: -32,
            borderColor: colors.backgroundSecondary,
            borderWidth: 2,
            borderBottomWidth: 0,
          }}
        >
          {isError && (
            <View className="flex flex-row justify-center">
              <Text className="text-red-600 text-base  font-pregular">
                Wystąpił nieoczekiwany błąd, sprawdź swoje połączenie z
                internetem. Jeśli problem nadal występuje, spróbuj ponownie
                później.
              </Text>
            </View>
          )}
          {isLoading ? (
            <View className="mt-4 gap-2">
              <View className="w-11/12 h-8 bg-zinc-600 animate-pulse rounded-full" />
              <View className="w-1/3 h-4 bg-zinc-600 animate-pulse rounded-full" />
              <View className="mt-4 w-3/5 h-4 bg-zinc-600 animate-pulse rounded-full" />
              <View className=" w-3/4 h-4 bg-zinc-600 animate-pulse rounded-full" />
              <View className=" w-1/3 h-4 bg-zinc-600 animate-pulse rounded-full" />
            </View>
          ) : (
            <View className="flex gap-1 flex-col mt-4">
              <Text className="text-foreground text-4xl font-psemibold ">
                {data?.data.attributes.title}
              </Text>
              <Text className="text-primary text-sm font-psemibold">
                {format(
                  new Date(
                    (data as SingleNewsResponse).data.attributes.customDate
                      ? ((data as SingleNewsResponse).data.attributes
                          .customDate as string)
                      : (data?.data.attributes.createdAt as string),
                  ),
                  "d LLLL yyyy",
                  { locale: pl },
                )}
              </Text>

              <View className="bg-background flex-1 mt-4 h-full w-full">
                <Text className="font-pregular text-base text-foreground h-full w-full">
                  {data?.data.attributes.content}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  )
}
