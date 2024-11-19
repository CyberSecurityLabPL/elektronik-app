import { useTimeTo } from "@/hooks/useTimeTo"
import { StrapiEvent } from "@/types/strapi"
import EventCard from "./cards/EventCard"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"
import { localeFormat } from "@/lib/utils"

export default function EventItem({
  item,
  index,
  t,
}: {
  item: StrapiEvent
  index: number
  t: TFunction<"translation", undefined>
}) {
  const { days, hours, minutes, seconds, timeNumber, nameString } = useTimeTo({
    date: item.attributes.date,
  })

  return (
    <View className="">
      <EventCard
        title={item.attributes.title}
        date={localeFormat(new Date(item.attributes.date), "d MMMM")}
        description={item.attributes.description}
        type={item.attributes.type}
        timeLeft={
          timeNumber === 0
            ? t("Events.today")
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
            {t("Events.section")}
          </Text>
        </View>
      )}
    </View>
  )
}
