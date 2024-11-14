import IconButton from "@/components/ui/IconButton"
import { useAnnouncement } from "@/hooks/announcements/useAnnouncements"
import { SingleNewsResponse } from "@/hooks/articles/types"
import { useArticle } from "@/hooks/articles/useArticles"
import useColors from "@/hooks/useColors"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { router, useLocalSearchParams } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { SafeAreaView, ScrollView, Text, View } from "react-native"

export default function articleScreen() {
  const { id } = useLocalSearchParams()
  const colors = useColors()

  const { data, isLoading, isError, error } = id.includes("n")
    ? useArticle({ id: Number(id.slice(1)) })
    : useAnnouncement({ id: Number(id.slice(1)) })

  return (
    <SafeAreaView className="w-full h-full bg-background p-8">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-8"
      >
        <View className="gap-12 w-full py-4">
          <View>
            <IconButton
              LucideIcon={ChevronLeft}
              iconColor={colors.foreground}
              onPress={() => router.back()}
            />
          </View>
          <View className="flex gap-4">
            <Text className="text-foreground text-4xl font-psemibold">
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
        </View>
        <View className="bg-background">
          <Text className="font-pregular text-base text-foreground">
            {isLoading ? "Ładowanie..." : data?.data.attributes.content}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
