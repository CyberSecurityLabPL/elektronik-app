import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import { addDays, format, subDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { RefreshControl, ScrollView, Text, View } from "react-native"
import { pl } from "date-fns/locale/pl"
import { useCallback, useEffect, useState } from "react"

import { useSubstitutions } from "@/hooks/substitutions/useSubstitutions"
import useColors from "@/hooks/useColors"

const Substitutions = () => {
  const [date, setDate] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      refetch()
    }, 2000)
  }, [])

  const goBack = () => {
    setDate((prevDate) => subDays(prevDate, 1))
  }

  const goForward = () => {
    setDate((prevDate) => addDays(prevDate, 1))
  }

  useEffect(() => {
    const { data, isLoading, isError, refetch, isRefetching } =
      useSubstitutions({
        date,
      })
  }, [date])

  const colors = useColors()

  return (
    <ScreenWrapper>
      <ScrollView
        className="  flex flex-col"
        contentContainerClassName="justify-center"
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
              <Text className="text-foreground text-base font-pregular">
                {isError && "Błąd"}
                {(isLoading || isRefetching) && (
                  <View className="rounded-full bg-slate-800 w-full h-4 animate-pulse"></View>
                )}
                {data?.data.length === 0 ? (
                  <View></View>
                ) : (
                  data?.data[0].attributes.substitutions
                )}
              </Text>
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
