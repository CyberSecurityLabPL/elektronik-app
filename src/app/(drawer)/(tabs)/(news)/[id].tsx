import ScreenWrapper from "@/components/ScreenWrapper"
import IconButton from "@/components/ui/IconButton"
import { useAnnouncement } from "@/hooks/announcements/useAnnouncements"
import { SingleNewsResponse } from "@/hooks/articles/types"
import { useArticle } from "@/hooks/articles/useArticles"
import useColors from "@/hooks/useColors"
import { cn, getStrapiImageUrl } from "@/lib/utils"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { router, Stack, useLocalSearchParams } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { useEffect, useState } from "react"
import {
  ColorValue,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated"
import DefaultBanner from "@/components/svgs/DefaultBanner"

export default function articleScreen() {
  const { id } = useLocalSearchParams()
  const colors = useColors()
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)

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

  const { data, isLoading, isError, error } = id.includes("n")
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
        // contentContainerClassName="gap-8"
        ref={scrollRef}
        scrollEventThrottle={16}
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
          }}
        >
          <View className="flex gap-1  mt-4">
            <Text className="text-foreground text-4xl font-psemibold ">
              {isLoading ? "Ładowanie..." : data?.data.attributes.title}
            </Text>
            <Text className="text-primary text-sm font-psemibold">
              {isLoading
                ? "Ładowanie..."
                : format(
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
          </View>
          <View className="bg-background flex-1 ">
            <Text className="font-pregular text-base text-foreground">
              {isLoading ? "Ładowanie..." : data?.data.attributes.content}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}
