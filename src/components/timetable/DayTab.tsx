import { cn } from "@/lib/utils"
import React from "react"
import { Pressable, PressableProps, Text } from "react-native"

interface DayTabProps extends React.HTMLProps<PressableProps> {
  active?: boolean
  day: "Pn." | "Wt." | "Śr." | "Cz." | "Pt."
  date: string
  props?: PressableProps
}

const DayTab = ({ active, date, day, props }: DayTabProps) => {
  return (
    <Pressable
      android_ripple={{ color: "#00000030", borderless: false }}
      aria-active={active}
      className="flex justify-center items-center gap-2 py-2 px-5 rounded-2xl aria-[active]:bg-primary dark:bg-[#1D1D1D] bg-[#FBFBFB] overflow-hidden"
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
  )
}

export default DayTab
