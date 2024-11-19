import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ScrollView,
} from "react-native"
import React, { useState } from "react"
import { Clock, X } from "lucide-react-native"
import { cn } from "@/lib/utils"
import useColors from "@/hooks/useColors"
import Modal from "../ui/Modal"
import IconButton from "../ui/IconButton"
import { HalfCircle, RotatedSquares, Squares, Star, Lines } from "../icons"
interface EventProps extends TouchableOpacityProps {
  isFeatured?: boolean
  type: string
  title: string
  date: string
  description: string
  timeLeft: string
  color?: "blue" | "pink"
  props?: TouchableOpacityProps
}

const EventCard = ({
  isFeatured,
  type,
  title,
  date,
  description,
  timeLeft,
  color,
  ...props
}: EventProps) => {
  const colors = useColors()
  const [modalOpen, setModalOpen] = useState(false)

  if (isFeatured) {
    return (
      <TouchableOpacity
        className=" overflow-hidden w-full rounded-3xl py-6 px-6 dark:bg-[#FFB055] bg-[#FFCA8D] flex justify-center"
        activeOpacity={0.85}
        onPress={() => {
          setModalOpen(true)
        }}
        {...props}
      >
        <View className="flex flex-row justify-between items-center ">
          <Text className="text-base font-medium">{type}</Text>
          <View className="flex-row items-center justify-center gap-2 py-1 px-3 rounded-xl bg-[#FFEEDA]">
            <Clock size={16} color={"#212121"} strokeWidth={3} />
            <Text className="text-xl font-psemibold">{timeLeft}</Text>
          </View>
        </View>
        <View className="flex justify-center min-h-32 py-2">
          <Text className="text-5xl font-psemibold line-clamp-3 leading-tight  ">
            {title}
          </Text>
        </View>

        <View className="flex-row justify-end  w-full">
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-lg font-pmedium">{date}</Text>
            <Clock size={16} color={"#212121"} strokeWidth={3} />
          </View>
        </View>

        {/* SVGs */}
        <View className="absolute -bottom-11 -left-20 -z-10">
          <HalfCircle color={colors.eventSvg.halfCircle} />
        </View>
        <View className="absolute top-0 left-5 -z-10">
          <Squares color={colors.eventSvg.squares} />
        </View>
        <View className="absolute -top-12 -right-20 -z-10">
          <RotatedSquares
            color={colors.eventSvg.rotatedSquares}
            width={162}
            height={162}
          />
        </View>

        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <ModalContent
            iconColor={colors.foreground}
            title={title}
            date={date}
            description={description}
            onPress={() => setModalOpen(false)}
          />
        </Modal>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        className={cn(
          "rounded-3xl min-h-32 overflow-hidden w-full pt-11 pb-8 px-6 flex justify-center items-center bg-[#D4F6FF] dark:bg-[#74A8E5]",
          color === "blue" ? "bg-[#FFADED] dark:bg-[#DE5FE0]" : "",
        )}
        activeOpacity={0.85}
        onPress={() => {
          setModalOpen(true)
        }}
        {...props}
      >
        <View className="absolute top-3 left-7">
          <Text className="text-base font-medium">{type}</Text>
        </View>

        <View className="w-full flex flex-col gap-2">
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="text-3xl font-psemibold  leading-tight line-clamp-3 flex-1 mr-4">
              {title}
            </Text>

            <Text className="text-xl font-psemibold min-w-[80px] text-right">
              {date}
            </Text>
          </View>
        </View>

        {/* SVGs */}
        <View className="absolute -top-16 -right-6 -z-10">
          <Lines
            color={
              color === "blue"
                ? colors.eventSvg.pinkLines
                : colors.eventSvg.blueLines
            }
            width={141}
            height={141}
          />
        </View>
        <View className="absolute -bottom-28 -left-28 -z-10">
          <Star
            color={
              color === "blue"
                ? colors.eventSvg.pinkStar
                : colors.eventSvg.blueStar
            }
          />
        </View>

        <Modal
          isOpen={modalOpen}
          onClose={() => {
            // setModalOpen(false)
          }}
        >
          <ModalContent
            iconColor={colors.foreground}
            title={title}
            date={date}
            description={description}
            onPress={() => setModalOpen(false)}
          />
        </Modal>
      </TouchableOpacity>
    )
  }
}

export default EventCard

function ModalContent({ title, date, description, iconColor, onPress }: any) {
  return (
    <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background py-6 h-1/2">
      <View className="w-full px-6 py-1">
        <Text className="text-2xl text-foreground font-pmedium text-left ">
          {title}
        </Text>
        <Text className="text-primary font-psemibold">{date}</Text>
      </View>
      <ScrollView className="w-full px-6 py-1">
        <Text className="text-base text-foreground-secondary text-wrap mt-2 ">
          {description}
        </Text>
      </ScrollView>
      <IconButton
        LucideIcon={X}
        iconColor={iconColor}
        onPress={onPress}
        className="mt-4"
      />
    </View>
  )
}
