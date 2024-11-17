import ScreenWrapper from "@/components/ScreenWrapper"
import DayTab from "@/components/timetable/DayTab"
import Lesson from "@/components/timetable/Lesson"
import Input from "@/components/ui/Input"
import { useTimetable } from "@/hooks/timetable/useTimetable"
import useColors from "@/hooks/useColors"
import { getDayOfWeek } from "@/lib/utils"
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { add, format, isWeekend, startOfWeek } from "date-fns"
import { pl } from "date-fns/locale/pl"
import { Settings } from "lucide-react-native"
import { useCallback, useMemo, useRef, useState } from "react"
import { FlatList, Pressable, Text, View } from "react-native"

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
  // console.log(data)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleOpenPress = () => bottomSheetRef.current?.expand()
  const snapPoints = useMemo(() => ["0%", "50%"], [])
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  )
  if (isError)
    console.warn(
      "Zapewne masz zły URL planu lekcji, zmień go z localhost na ten komputera bo to tel fetchuje dane co potrzebujesz",
    )
  const colors = useColors()

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
        className="flex justify-center items-center px-4 w-full"
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
                  teacherId={item.classes[groupIndex].teacher.id}
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
      <View className="w-full absolute bottom-6  bg-background flex justify-center items-center p-4 pb-8">
        <Pressable
          className="flex justify-center items-center bg-background-secondary p-2 px-16 rounded-3xl"
          onPress={handleOpenPress}
        >
          <Text className="font-pmedium text-xl text-foreground ">2Tf</Text>
          <Text className="font-pregular text-foreground">
            Rozkład zajęć klasy
          </Text>
        </Pressable>
      </View>

      <BottomSheet
        index={-1}
        snapPoints={["60%"]}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: colors.foreground }}
        backgroundStyle={{ backgroundColor: colors.background }}
        ref={bottomSheetRef}
      >
        <BottomSheetView className="p-4">
          <Input type="text" className="" placeholder="Wyszukaj plan..." />
          {/* 3 Selecty  */}
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  )
}

export default Timetable
