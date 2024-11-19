import { useTimeTo } from "@/hooks/useTimeTo"
import { StrapiEvent } from "@/types/strapi"
import EventCard from "./cards/EventCard"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { Text, View } from "react-native"

export default function EventItem({
  item,
  index,
}: {
  item: StrapiEvent
  index: number
}) {
  const { days, hours, minutes, seconds, timeNumber, nameString } = useTimeTo({
    date: item.attributes.date,
  })

  return (
    <View className="">
      <EventCard
        title={item.attributes.title}
        date={format(new Date(item.attributes.date), "d MMMM", {
          locale: pl,
        })}
        description={item.attributes.description}
        type={item.attributes.type}
        timeLeft={
          timeNumber === 0
            ? "Dzisiaj"
            : days > 0
            ? `za ${timeNumber} ${nameString} i ${hours - 24 * days} h`
            : `za ${timeNumber} ${nameString}`
        }
        isFeatured={index === 0}
        color={index % 2 === 0 ? "blue" : "pink"}
      />
      {index === 0 && (
        <View className="mt-6">
          <Text className="text-2xl text-foreground font-psemibold">
            Następne wydarzenia
          </Text>
        </View>
      )}
    </View>
  )
}
