import { useTimeTo } from "@/hooks/useTimeTo"
import { StrapiEvent } from "@/types/strapi"
import EventCard from "./cards/EventCard"
import { format } from "date-fns"
import { pl } from "date-fns/locale/pl"

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
    <EventCard
      title={item.attributes.title}
      date={format(new Date(item.attributes.createdAt), "d MMMM", {
        locale: pl,
      })}
      description={item.attributes.description}
      type={item.attributes.type}
      timeLeft={
        days > 0
          ? `za ${timeNumber} ${nameString} i ${hours - 24 * days} h`
          : `za ${timeNumber} ${nameString}`
      }
      isFutureEvent={seconds > 0}
      color={index % 2 === 0 ? "blue" : "pink"}
    />
  )
}
