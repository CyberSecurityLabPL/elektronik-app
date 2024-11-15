import EventCard from "@/components/cards/EventCard"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import { useEvents } from "@/hooks/events/useEvents"
import { useTimeTo } from "@/hooks/useTimeTo"
import { StrapiEvent } from "@/types/strapi"
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  set,
} from "date-fns"
import { pl } from "date-fns/locale/pl"
import { useMemo, useState } from "react"
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native"

const Events = () => {
  const {
    data,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useEvents({
    page: 1,
    pageSize: 3,
  })

  const allArticles = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? []
  }, [data?.pages])

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: StrapiEvent
    index: number
  }) => {
    const { days, hours, minutes, seconds } = useTimeTo({
      date: item.attributes.date,
    })

    const timeString = (): number => {
      if (days > 0) return days
      if (hours > 0) return hours
      if (minutes > 0) return minutes
      if (seconds > 0) return seconds
      return 0
    }
    const nameString = (): string => {
      if (days > 0) {
        return days === 1
          ? "dzień"
          : days % 10 >= 2 &&
            days % 10 <= 4 &&
            (days % 100 < 10 || days % 100 >= 20)
          ? "dni"
          : "dni"
      }
      if (hours > 0) {
        return hours === 1
          ? "godzina"
          : hours % 10 >= 2 &&
            hours % 10 <= 4 &&
            (hours % 100 < 10 || hours % 100 >= 20)
          ? "godziny"
          : "godzin"
      }
      if (minutes > 0) {
        return minutes === 1
          ? "minuta"
          : minutes % 10 >= 2 &&
            minutes % 10 <= 4 &&
            (minutes % 100 < 10 || minutes % 100 >= 20)
          ? "minuty"
          : "minut"
      }
      if (seconds > 0) {
        return seconds === 1
          ? "sekunda"
          : seconds % 10 >= 2 &&
            seconds % 10 <= 4 &&
            (seconds % 100 < 10 || seconds % 100 >= 20)
          ? "sekundy"
          : "sekund"
      }
      return "czasu"
    }

    return (
      <EventCard
        title={item.attributes.title}
        date={format(new Date(item.attributes.createdAt), "d MMMM", {
          locale: pl,
        })}
        description={item.attributes.description}
        type={item.attributes.type}
        timeLeft={`za ${timeString()} ${nameString()}`}
        isFutureEvent={seconds > 0}
        color={index % 2 === 0 ? "blue" : "pink"}
      />
    )
  }

  return (
    <ScreenWrapper>
      <View className="flex flex-col items-center">
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          contentContainerClassName="flex flex-col items-center gap-4 pb-16 w-full"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={allArticles}
          ListHeaderComponent={
            <View className="min-w-full">
              <Heading title="Wydarzenia" />
            </View>
          }
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Events
