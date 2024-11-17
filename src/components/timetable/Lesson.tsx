import { View, Text, PressableProps, Pressable } from "react-native"
import React from "react"
import { Clock, X } from "lucide-react-native"
import { useColorScheme } from "nativewind"
import Modal from "../ui/Modal"
import { useState } from "react"
import IconButton from "../ui/IconButton"
import useColors from "@/hooks/useColors"
import { useTimetableInfo } from "@/hooks/timetable/useTimetable"

interface LessonProps {
  teacherId: string
  period: number
  time: string
  subject: string
  initials: string
  room: string
  props?: PressableProps
}

const Lesson = ({
  teacherId,
  period,
  time,
  subject,
  initials,
  room,
  props,
}: LessonProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === "dark"

  const colors = useColors()
  const { data: teachers } = useTimetableInfo({ filter: "teacher" })
  const getTeacherById = () => {
    if (!teachers) return null
    return teachers.find((teacher) => teacher.id === teacherId)
  }

  const teacher = getTeacherById()

  return (
    <View className="rounded-3xl overflow-hidden">
      <Pressable
        android_ripple={{ color: isDark ? "#00000030" : "#62586630" }}
        className="w-full rounded-3xl bg-background px-5 py-4 flex flex-row justify-between items-center border border-[#CFD4DD50] dark:border-[#47474750]"
        onPress={() => setModalOpen(true)}
        {...props}
      >
        <View className="flex flex-row justify-center items-center gap-5">
          <View className="flex justify-center items-center bg-primary/10 px-4 py-1 rounded-xl">
            <Text className="text-2xl font-psemibold text-primary">
              {period}
            </Text>
          </View>
          <View className="flex justify-center items-start">
            <Text
              className={`text-xl font-psemibold text-[#111827] dark:text-[#DEDEDE]`}
            >
              {subject}
            </Text>
            <View className="flex flex-row justify-center items-center gap-[0.15rem]">
              <Clock size={12} color={"#6D6D6D"} />
              <Text className="text-base text-[#6B7280] dark:text-[#6D6D6D]">
                {time}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-center items-center dark:bg-zinc-600/20 bg-zinc-200/20 px-3 py-1 rounded-md">
          <Text className="text-[#6D6D6D] text-1xl">
            {initials} {room}
          </Text>
        </View>
      </Pressable>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <View className="bg-background w-10/12 h-1/2 rounded-3xl px-9 py-7 flex items-center justify-between">
          <View className="gap-3 w-full h-fit">
            <View>
              <Text className="text-foreground font-pregular text-lg">
                Przedmiot
              </Text>
              <Text className="font-psemibold text-gray-700 dark:text-gray-400 text-2xl">
                {subject}
              </Text>
            </View>
            <View>
              <Text className="text-foreground font-pregular text-lg">
                Nauczyciel
              </Text>
              <Text className="font-pregular text-gray-700 dark:text-gray-400 text-2xl">
                {teacher?.name}
              </Text>
            </View>
            <View>
              <Text className="text-foreground text font-pregular text-lg">
                Sala
              </Text>
              <Text className="font-pregular text-gray-700 dark:text-gray-400 text-2xl">
                {room}
              </Text>
            </View>
            <View>
              <Text className="text-foreground font-pregular text-lg">
                Godziny
              </Text>
              <Text className="font-pregular text-gray-700 dark:text-gray-400 text-2xl">
                {time}
              </Text>
            </View>
          </View>
          <View className="flex items-center h-fit">
            <IconButton
              LucideIcon={X}
              iconColor={colors.closeButton}
              onPress={() => setModalOpen(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Lesson
