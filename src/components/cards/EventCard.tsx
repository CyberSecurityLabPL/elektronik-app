import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import React, { useState } from "react"
import { Clock } from "lucide-react-native"
import HalfCircleEvent from "../svgs/HalfCircleEvent"
import Squares from "../svgs/Squares"
import RotatedSquares from "../svgs/RotatedSquares"
import { cn } from "@/lib/utils"
import Lines from "../svgs/Lines"
import Star from "../svgs/Star"
import useColors from "@/hooks/useColors"
import Modal from "../ui/Modal"

interface EventProps extends TouchableOpacityProps {
  isFutureEvent?: boolean
  type: string
  title: string
  date: string
  description: string
  timeLeft: string
  color?: "blue" | "pink"
  props?: TouchableOpacityProps
}

const EventCard = ({
  isFutureEvent,
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

  if (isFutureEvent) {
    return (
      <View>
        <TouchableOpacity
          className={cn(
            "rounded-3xl overflow-hidden w-full pt-11 pb-8 px-6 flex justify-center items-center bg-[#D4F6FF] dark:bg-[#74A8E5]",
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

          <View className="flex-row justify-center items-center">
            <View className="w-2/3">
              <Text className="text-5xl font-psemibold leading-tight">
                {title}
              </Text>
            </View>
            <View className="w-1/3">
              <Text className="text-xl font-psemibold">{date}</Text>
            </View>
          </View>
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
        </TouchableOpacity>
        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <View className="bg-background-secondary w-10/12 rounded-3xl flex justify-top items-start py-12 px-10">
            <View className="flex items-start justify-center pb-4">
              <Text className="text-5xl font-psemibold text-[#424255] dark:text-[#DEDEDE] h-fit pt-2">
                {title}
              </Text>
              <Text className="text-base font-psemibold text-primary">
                {date}
              </Text>
            </View>
            <Text className="text-xl font-pregular text-[#424255] dark:text-[#DFDEDE]">
              {description}
            </Text>
          </View>
        </Modal>
      </View>
    )
  } else {
    return (
      <View>
        <TouchableOpacity
          className=" overflow-hidden w-full rounded-3xl pt-9 pb-5 px-6 dark:bg-[#FFB055] bg-[#FFCA8D] flex justify-center"
          activeOpacity={0.85}
          onPress={() => {
            setModalOpen(true)
          }}
          {...props}
        >
          <View className="flex flex-row justify-between items-center ">
            <View>
              <Text className="text-base font-medium">{type}</Text>
            </View>
            <View className="flex-row items-center justify-center gap-2 py-1 px-3 rounded-xl bg-[#FFEEDA]">
              <Clock size={16} color={"#212121"} strokeWidth={3} />
              <Text className="text-xl font-psemibold">{timeLeft}</Text>
            </View>
          </View>
          <View>
            <Text className="text-6xl font-psemibold leading-tight pt-6">
              {title}
            </Text>
          </View>
          <View className="flex-row justify-end pt-7">
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-lg font-pmedium">{date}</Text>
              <Clock size={16} color={"#212121"} strokeWidth={3} />
            </View>
          </View>
          <View className="absolute -bottom-11 -left-20 -z-10">
            <HalfCircleEvent color={colors.eventSvg.halfCircle} />
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
        </TouchableOpacity>
        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <View className="bg-background-secondary w-10/12 rounded-3xl flex justify-top items-start py-12 px-10">
            <View className="flex items-start justify-center pb-4">
              <Text className="text-5xl font-psemibold text-[#424255] dark:text-[#DEDEDE] h-fit pt-2">
                {title}
              </Text>
              <Text className="text-base font-psemibold text-primary">
                {date}
              </Text>
            </View>
            <Text className="text-xl font-pregular text-[#424255] dark:text-[#DFDEDE]">
              {description}
            </Text>
          </View>
        </Modal>
      </View>
    )
  }
}

export default EventCard
