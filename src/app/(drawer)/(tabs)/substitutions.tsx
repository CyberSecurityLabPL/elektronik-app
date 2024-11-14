import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import { useSubstitutions } from "@/hooks/substitutions/useSubstitutions"
import useColors from "@/hooks/useColors"
import { useQueryClient } from "@tanstack/react-query"
import { addDays, format, subDays } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { useCallback, useState } from "react"
import { RefreshControl, ScrollView, Text, View } from "react-native"

const Substitutions = () => {
  const [date, setDate] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)

  const queryClient = useQueryClient()
  const colors = useColors()

  const { data, isLoading, isError, isRefetching, fetchNextPage, isFetching } =
    useSubstitutions({ date })

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient
      .invalidateQueries({ queryKey: ["substitutions"] })
      .finally(() => {
        setRefreshing(false)
      })
  }, [queryClient])

  const goBack = useCallback(() => {
    setDate((prevDate) => subDays(prevDate, 1))

    fetchNextPage()
  }, [])

  const goForward = useCallback(() => {
    setDate((prevDate) => addDays(prevDate, 1))

    fetchNextPage()
  }, [])

  return (
    <ScreenWrapper>
      <ScrollView
        className="  flex flex-col"
        contentContainerClassName="justify-center"
        nestedScrollEnabled={true}
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
        <Heading title="Zastępstwa" />
        <View className="bg-background-secondary w-full p-4 rounded-2xl mt-8 flex justify-center items-center">
          <Text className="text-3xl font-pmedium text-foreground">
            {format(date, "d MMMM yyyy", { locale: pl })}
          </Text>
        </View>
        <View className="bg-background-secondary light w-full p-4 rounded-2xl mt-6   ">
          <View className="max-h-96 h-96 min-h-96  bg-background rounded-lg p-6">
            <ScrollView nestedScrollEnabled>
              <View>
                {isError && (
                  <Text className="text-foreground text-base font-pregular ">
                    Wystąpił błąd, Odśwież lub spróbuj ponownie później
                  </Text>
                )}
                {isLoading || isRefetching || isFetching ? (
                  <View className="flex flex-col gap-2">
                    <View className="rounded-full flex bg-zinc-500 w-full h-4 animate-pulse"></View>
                    <View className="rounded-full flex bg-zinc-500 w-1/2 h-4 animate-pulse"></View>
                    <View className="rounded-full flex bg-zinc-500 w-2/3 h-4 animate-pulse"></View>
                  </View>
                ) : (
                  <Text className="text-foreground text-base font-pregular">
                    {data?.pages[0].data.length === 0 ? (
                      <Text className="text-2xl font-psemibold text-foreground text-center">
                        Brak Zastępstw
                      </Text>
                    ) : (
                      data?.pages[0].data[0].attributes.substitutions
                    )}
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>

        <View className="flex flex-row justify-around items-center w-full mt-4 ">
          <IconButton
            onPress={goBack}
            LucideIcon={ChevronLeft}
            iconColor={colors.foreground}
          />
          <IconButton
            onPress={goForward}
            LucideIcon={ChevronRight}
            iconColor={colors.foreground}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Substitutions
