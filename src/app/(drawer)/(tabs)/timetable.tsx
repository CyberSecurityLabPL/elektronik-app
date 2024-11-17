import ScreenWrapper from "@/components/ScreenWrapper"
import DayTab from "@/components/timetable/DayTab"
import Lesson from "@/components/timetable/Lesson"
import { useTimetable } from "@/hooks/timetable/useTimetable"
import { getDayOfWeek } from "@/lib/utils"
import { add, format, isWeekend, startOfWeek } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { Settings } from "lucide-react-native"
import { useState } from "react"
import { FlatList, Text, View } from "react-native"

type classDays = "poniedzialek" | "wtorek" | "sroda" | "czwartek" | "piatek"
type allDays = classDays | "sobota" | "niedziela"

const Timetable = () => {
  //todo manage group and showReligion in settings
  const group: number = 2
  const showReligion: boolean = false

  const getDayName = (date: Date) =>
    format(date, "EEEE", { locale: pl })
      .replaceAll("ł", "l")
      .replaceAll("ś", "s")
      .replaceAll("ą", "a") as allDays

  const [day, setDay] = useState<allDays>(
    getDayName(
      isWeekend(new Date())
        ? startOfWeek(add(new Date(), { days: 2 }), { locale: pl })
        : new Date(),
    ),
  )
  const { data, isError } = useTimetable({ id: "o25" })

  if (isError)
    console.warn(
      "Zapewne masz zły URL planu lekcji, zmień go z localhost na ten komputera bo to tel fetchuje dane co potrzebujesz",
    )

  return (
    <ScreenWrapper className="flex justify-top items-center w-full h-full px-0">
      <View className="flex flex-row justify-between items-center w-full py-4 px-8">
        <Text className="text-foreground font-psemibold text-3xl">
          Plan Lekcji
        </Text>
        <View className="flex justify-center items-center bg-background-secondary p-2 rounded-xl">
          <Settings size={24} color={"#B6B6D9"} />
        </View>
      </View>
      <View className="flex-row justify-between items-center pb-6 px-5 w-full">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <DayTab
              key={`DayTab${i}`}
              day={format(getDayOfWeek(i + 1), "EEEEEE.", { locale: pl })}
              date={format(getDayOfWeek(i + 1), "dd.MM")}
              onPress={() => {
                setDay(getDayName(getDayOfWeek(i + 1)))
              }}
              active={day === getDayName(getDayOfWeek(i + 1))}
            />
          ))}
      </View>
      <View
        className="flex justify-center items-center px-8 w-full"
        style={{ marginBottom: 170 }}
      >
        <FlatList
          contentContainerClassName="pb-4"
          showsVerticalScrollIndicator={false}
          data={data?.lessons[day as classDays]}
          renderItem={({ item, index }) => {
            const groupIndex = item.isDouble && group === 2 ? 1 : 0

            if (
              item.isEmpty ||
              (item.classes.length === 1 &&
                item.classes[0].class.group != null &&
                item.classes[0].class.group?.charAt(0) != group.toString()) ||
              (!showReligion &&
                item.classes[0].subject.name.includes("religia"))
            )
              return null
            else
              return (
                <Lesson
                  teacherName={item.classes[groupIndex].teacher.shortname}
                  period={index}
                  time={data?.hours[index] ?? ""}
                  subject={item.classes[groupIndex].subject.name}
                  room={item.classes[groupIndex].classroom.shortname}
                  initials={item.classes[groupIndex].teacher.shortname}
                />
              )
          }}
          keyExtractor={(_, index) => `LessonMapped${index}`}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Timetable
