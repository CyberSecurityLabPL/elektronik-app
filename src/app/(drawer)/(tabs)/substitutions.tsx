import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import { useSubstitutions } from "@/hooks/substitutions/useSubstitutions"
import useColors from "@/hooks/useColors"
import { localeFormat } from "@/lib/utils"
import { addDays, subDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { RefreshControl, ScrollView, Text, View } from "react-native"

const Substitutions = () => {
  const [date, setDate] = useState(new Date())
  const colors = useColors()
  const { t } = useTranslation()

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    fetchNextPage,
    isFetching,
    resetInfiniteQueryPagination,
  } = useSubstitutions({ date })

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
            refreshing={isRefetching}
            onRefresh={resetInfiniteQueryPagination}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={colors.backgroundSecondary}
          />
        }
      >
        <Heading title={t("Substitutions.heading")} />
        <View className="bg-background-secondary w-full p-4 rounded-2xl mt-8 flex justify-center items-center">
          <Text className="text-3xl font-pmedium text-foreground">
            {/* "d MMMM yyyy" */}
            {localeFormat(date, "d MMMM yyyy")}
          </Text>
        </View>
        <View className="bg-background-secondary light w-full p-4 rounded-2xl mt-6   ">
          <View className="max-h-96 h-96 min-h-96  bg-background rounded-lg p-6">
            <ScrollView nestedScrollEnabled>
              <View>
                {isError && (
                  <Text className="text-red-600 text-base  font-pregular ">
                    {t("Substitutions.error")}
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
                      <Text className="text-2xl font-psemibold text-foreground text-left">
                        {t("Substitutions.none")}
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
