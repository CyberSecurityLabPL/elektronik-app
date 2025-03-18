import { cn } from "@/lib/utils"
import React from "react"
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native"

interface DayTabProps extends React.HTMLProps<PressableProps> {
  active?: boolean
  day: string
  date: string
  onPress?: ((event: GestureResponderEvent) => void) | null
  props?: PressableProps
}

const DayTab = ({ active, date, day, onPress, props }: DayTabProps) => {
  return (
    <View className="rounded-3xl">
      <Pressable
        android_ripple={{ color: "#00000030" }}
        aria-active={active ? active : undefined}
        className="flex justify-center items-center gap-2 py-2 px-4 rounded-2xl aria-[active]:bg-primary dark:bg-[#1D1D1D] bg-[#FBFBFB]"
        onPress={onPress}
        {...props}
      >
        <Text
          className={cn(
            "text-base font-pmedium",
            active ? "text-white" : "text-foreground",
          )}
        >
          {day}
        </Text>
        <Text
          className={cn(
            "text-sm font-pregular",
            active ? "text-white" : "text-foreground",
          )}
        >
          {date}
        </Text>
      </Pressable>
    </View>
  )
}

export default DayTab
