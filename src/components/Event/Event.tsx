import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TouchableOpacityProps,
} from "react-native"
import React from "react"
import { Clock } from "lucide-react-native"

interface EventProps extends TouchableOpacityProps {
  type: "future event" | "event"
  title: string
  content: string
  date: string
  timeLeft: string
}

const Event: React.FC<EventProps> = ({
  type,
  title,
  content,
  date,
  timeLeft,
  ...props
}) => {
  if (type === "event") {
    return (
      <TouchableOpacity
        className="rounded-3xl overflow-hidden w-full color-[#222222]"
        activeOpacity={0.85}
        {...props}
      >
        <ImageBackground
          source={require("../../assets/images/event-card-background.png")}
          className="rounded-3xl pt-9 pb-6 px-6"
        >
          <View className="flex flex-row justify-between items-center">
            <View>
              <Text className="text-base font-medium">{title}</Text>
            </View>
            <View className="flex-row items-center justify-center gap-2 py-1 px-3 rounded-xl bg-[#FFEEDA]">
              <Clock size={16} color={"#212121"} strokeWidth={3} />
              <Text className="text-xl font-psemibold">{timeLeft}</Text>
            </View>
          </View>
          <View>
            <Text className="text-6xl font-psemibold leading-tight pt-6">
              {content}
            </Text>
          </View>
          <View className="flex-row justify-end pt-7">
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-lg font-pregular">{date}</Text>
              <Clock size={16} color={"#212121"} strokeWidth={3} />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        className="rounded-3xl overflow-hidden w-full"
        activeOpacity={0.85}
      >
        <ImageBackground
          source={require("../../assets/images/future-event-card-background.png")}
          className="rounded-3xl pt-11 pb-10 px-6 flex justify-center items-center"
        >
          <View className="absolute top-3 left-7">
            <Text className="text-base font-medium color-[#222222]">
              {title}
            </Text>
          </View>

          <View className="flex-row justify-center items-center">
            <View className="w-2/3">
              <Text className="text-[2.5rem] font-psemibold leading-tight color-[#222222]">
                {content}
              </Text>
            </View>
            <View className="w-1/3">
              <Text className="text-xl font-pregular color-[#222222]">
                {date}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}

export default Event
