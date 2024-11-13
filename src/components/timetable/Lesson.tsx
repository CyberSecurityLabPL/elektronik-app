import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { Clock } from "lucide-react-native"

interface LessonProps {
  period: number
  time: string
  subject: string
  teacher: string
  room: string
}

const Lesson = ({ period, time, subject, teacher, room }: LessonProps) => {
  return (
    <TouchableOpacity
      className="w-full rounded-3xl bg-background px-5 py-4 flex flex-row justify-between items-center border border-[#474747] border-opacity-50"
      activeOpacity={0.85}
      onPress={() => {
        console.log("LessonCard pressed")
      }}
    >
      <View className="flex flex-row justify-center items-center gap-5">
        <View className="flex justify-center items-center bg-primary/10 px-4 py-1 rounded-xl">
          <Text className="text-2xl font-psemibold text-primary">{period}</Text>
        </View>
        <View className="flex justify-center items-start">
          <Text className="text-2xl font-psemibold text-[#DEDEDE]">
            {subject}
          </Text>
          <View className="flex flex-row justify-center items-center gap-[0.15rem]">
            <Clock size={12} color={"#6D6D6D"} />
            <Text className="text-base text-[#6D6D6D]">{time}</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-center items-center bg-background-secondary px-3 py-1 rounded-md">
        <Text className="text-[#6D6D6D] text-1xl">
          {teacher} {room}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Lesson
