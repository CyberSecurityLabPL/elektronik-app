import useColors from "@/hooks/useColors"
import { useTimeTo } from "@/hooks/useTimeTo"
import { localeFormat } from "@/lib/utils"
import { StrapiEvent } from "@/types/strapi"
import { TFunction } from "i18next"
import { X } from "lucide-react-native"
import { useState } from "react"
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import EventCard from "./cards/EventCard"
import IconButton from "./ui/IconButton"
import Modal from "./ui/Modal"

export default function EventItem({
  item,
  index,
  t,
}: {
  item: StrapiEvent
  index: number
  t: TFunction<"translation", undefined>
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const colors = useColors()
  const { days, hours, timeNumber, nameString } = useTimeTo({
    date: item.date,
  })

  return (
    <View>
      <EventCard
        title={item.title}
        date={localeFormat(new Date(item.date), "d MMMM")}
        description={item.description}
        type={item.type}
        onPress={() => setModalOpen(true)}
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent
          iconColor={colors.foreground}
          title={item.title}
          date={localeFormat(new Date(item.date), "d MMMM")}
          description={item.description}
          onPress={() => setModalOpen(false)}
        />
      </Modal>
    </View>
  )
}
function ModalContent({ title, date, description, iconColor, onPress }: any) {
  return (
    <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background py-6 h-1/2">
      <Pressable
        onPress={(e) => e.stopPropagation()}
        className=" justify-between items-center h-full px-8 w-full"
      >
        <View className="w-full  py-1">
          <Text className="text-2xl text-foreground font-pmedium text-left ">
            {title}
          </Text>
          <Text className="text-primary font-psemibold">{date}</Text>
        </View>
        <ScrollView
          className="w-full "
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
        >
          <TouchableOpacity>
            <TouchableWithoutFeedback>
              <Text className="text-base text-foreground-secondary text-wrap mt-2">
                {description}
              </Text>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </ScrollView>
        <IconButton
          LucideIcon={X}
          iconColor={iconColor}
          onPress={onPress}
          className="mt-4"
        />
      </Pressable>
    </View>
  )
}
