import ScreenWrapper from "@/components/ScreenWrapper"
import { FlatList, ScrollView, Text, View } from "react-native"
import DayTab from "@/components/timetable/DayTab"
import Lesson from "@/components/timetable/Lesson"
import { Settings } from "lucide-react-native"

interface Lesson {
  period: number
  time: string
  subject: string
  room: string
  teacher: string
}

const lessons: Lesson[] = [
  {
    period: 1,
    time: "8:00-8:45",
    subject: "Matematyka",
    room: "101",
    teacher: "AA",
  },
  {
    period: 2,
    time: "9:00-9:45",
    subject: "Fizyka",
    room: "102",
    teacher: "BB",
  },
  {
    period: 3,
    time: "10:00-10:45",
    subject: "Chemia",
    room: "103",
    teacher: "CC",
  },
  {
    period: 4,
    time: "11:00-11:45",
    subject: "Biologia",
    room: "104",
    teacher: "DD",
  },
  {
    period: 5,
    time: "12:00-12:45",
    subject: "Historia",
    room: "105",
    teacher: "EE",
  },
  {
    period: 6,
    time: "13:00-13:45",
    subject: "Geografia",
    room: "106",
    teacher: "FF",
  },
  {
    period: 7,
    time: "14:00-14:45",
    subject: "WOS",
    room: "107",
    teacher: "GG",
  },
  {
    period: 8,
    time: "15:00-15:45",
    subject: "Informatyka",
    room: "108",
    teacher: "HH",
  },
  { period: 9, time: "16:00-16:45", subject: "WF", room: "109", teacher: "II" },
  {
    period: 10,
    time: "17:00-17:45",
    subject: "Muzyka",
    room: "110",
    teacher: "JJ",
  },
  {
    period: 11,
    time: "18:00-18:45",
    subject: "Plastyka",
    room: "111",
    teacher: "KK",
  },
  {
    period: 12,
    time: "19:00-19:45",
    subject: "Religia",
    room: "112",
    teacher: "LL",
  },
]

const Timetable = () => {
  return (
    <ScreenWrapper className="flex justify-top items-center w-full h-full">
      <View className="flex flex-row justify-between items-center w-full pb-4">
        <Text className="text-foreground font-pregular text-2xl">
          Plan Lekcji
        </Text>
        <View className="flex justify-center items-center bg-background-secondary p-2 rounded-xl">
          <Settings size={24} color={"#B6B6D9"} />
        </View>
      </View>
      <View className="flex-row justify-center items-center pb-7 gap-3">
        <DayTab day="Pn." date="30.22" active />
        <DayTab day="Wt." date="31.22" />
        <DayTab day="Śr." date="01.23" />
        <DayTab day="Cz." date="02.23" />
        <DayTab day="Pt." date="03.23" />
      </View>
      <View className="flex justify-center items-center h-[70vh]">
        <FlatList
          data={lessons}
          renderItem={({ item }) => (
            <Lesson
              period={item.period}
              time={item.time}
              subject={item.subject}
              room={item.room}
              teacher={item.teacher}
            />
          )}
          keyExtractor={(item) => item.period.toString()}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Timetable
