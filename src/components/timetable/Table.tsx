import { useTimetable, useTimetableInfo } from "@/hooks/timetable/useTimetable"
import { View, Text, FlatList, RefreshControl } from "react-native"
import Lesson from "./Lesson"
import { useTimetableSettings } from "@/hooks/useTimetableSettings"
import { DayLesson } from "@/hooks/timetable/types"
import useColors from "@/hooks/useColors"
import NoDataSvg from "../icons/NoDataSvg"
import { useTranslation } from "react-i18next"
import { RelaxSvg } from "../icons/Relax"
import Button from "../ui/Button"


export const Table = ({
    selectedDay,
    selectedTimetable
}: {
    selectedDay: number,
    selectedTimetable: string
}) => {
    const { data: teachers } = useTimetableInfo({ filter: "teacher" })
    const { data: timetableSettings } = useTimetableSettings()
    const colors = useColors()

    // Check if this is a special timetable that should skip group/religion checks
    const skipFilters = selectedTimetable.startsWith('n') || selectedTimetable.startsWith('s')

    const {
        data,
        isLoading,
        refetch: refetchTimetable,
        isRefetching: isRefetchingTimetable,
        isError
    } = useTimetable({ id: selectedTimetable })

    if (isLoading || isRefetchingTimetable) {
        return <LoadingSkeleton />
    }

    if (isError) {
        return <NoData refetch={refetchTimetable} />
    }

    const lessonsForDay = Object.values(data?.lessons || {})[selectedDay]
    if (lessonsForDay.length === 0 || (lessonsForDay.length > 0 && lessonsForDay.every(lesson => lesson.isEmpty))) return (
        <View className="flex flex-col items-center w-full h-full mt-10 gap-y-4">
            <Text className="text-foreground font-bold text-3xl text-center">Brak lekcji tego dnia!</Text>
            <RelaxSvg
            height='40%'
            width='80%' />
        </View>
    )


    return (
        <View className="flex justify-center items-center px-4 w-full mb-48">
            <FlatList
                contentContainerClassName="pb-32"
                showsVerticalScrollIndicator={false}
                initialNumToRender={8}
                getItemLayout={(_, index) => (
                    // Pre-calculate item heights for faster rendering
                    { length: 80, offset: 80 * index, index }
                )}
                data={lessonsForDay}
                renderItem={({ item, index }) => {
                    // index is the period number (pl. numer lekcji)
                    const groupIndex = item.isDouble && timetableSettings?.group === 2 ? 1 : 0
                    const lessons = Object.values(data?.lessons || {})[selectedDay]
                    const prevLesson = index > 0 ? lessons[index - 1] : null

                    // Check if the lesson is an empty slot
                    // 1. If it's the first period and it's empty
                    // 2. If it's the 8th period or later and it's empty
                    // 3. If the previous lesson is also empty
                    // 4. If there are no more lessons after this one
                    if (
                        (item.isEmpty && (index === 0 || index >= 8)) ||
                        (item.isEmpty && prevLesson?.isEmpty) ||
                        (item.isEmpty && !hasMoreLessonsAfter(lessons, index))
                    ) return null
                    
                    if (
                        (item.isEmpty) || // Regular empty period
                        (!skipFilters && // Skip group check for special timetables
                         item.classes.length === 1 && // Other group's lesson
                         item.classes[0].class?.group != null && // Check if it's a group lesson
                         item.classes[0].class.group?.charAt(0) != timetableSettings?.group.toString() && // Check if it's the correct group
                         !prevLesson?.isEmpty) // Check if the previous lesson is not empty
                    ) return <EmptySlot period={index} />
                    
                    // Check if the lesson is a religion lesson and religion lessons are disabled
                    // By default it don't check if previous lesson is empty because it's always at 0 or 8/9 lesson
                    if (!skipFilters && // Skip religion check for special timetables 
                        !timetableSettings?.religion && 
                        item.classes[groupIndex].subject.name.includes("religia")) {
                        return null
                    }

                    return (
                        <Lesson
                            teacherId={item.classes[groupIndex].teacher.id}
                            period={index}
                            time={data?.hours[index] ?? ""}
                            subject={item.classes[groupIndex].subject.name}
                            room={item.classes[groupIndex].classroom.shortname}
                            initials={item.classes[groupIndex].teacher.shortname}
                            teachersData={teachers}
                            showGroup={skipFilters}
                            groupNumber={item.classes[groupIndex].class?.group ?? ""}
                        />
                    )
                }}
                keyExtractor={(_, index) => `LessonMapped${index}`}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetchingTimetable}
                        onRefresh={() => refetchTimetable()}
                        tintColor={colors.primary}
                        colors={[colors.primary]}
                        progressBackgroundColor={colors.backgroundSecondary}
                    />
                }
            />
        </View>
    )
}

const EmptySlot = ({ period }: { period: number }) => {
    return (
        <View className="rounded-2xl overflow-hidden mb-2 opacity-50 w-full bg-background px-5 py-4 flex flex-row justify-start items-center border border-[#CFD4DD50] dark:border-[#47474750 gap-5">
            <View className="flex justify-center items-center bg-primary/10 px-4 py-1 rounded-xl">
                <Text className="text-2xl font-psemibold text-primary">
                    {period}
                </Text>
            </View>
            <Text className="text-center text-foreground">Okienko</Text>
        </View>
    )
}

const hasMoreLessonsAfter = (lessons: DayLesson[], index: number) => {
    for (let i = index + 1; i < lessons.length; i++) {
        if (!lessons[i].isEmpty) return true;
    }
    return false;
}

const LoadingSkeleton = () => {
  return (
    <View className="flex flex-col justify-center items-center p-4 gap-y-2 w-full">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <View
            key={`Loading-Skeleton-${i}`}
            className="w-full h-24 bg-background-secondary animate-pulse rounded-2xl"
          ></View>
        ))}
    </View>
  )
}

const NoData = ({ refetch }: { refetch: () => void }) => {
    const { t } = useTranslation()

    return (
      <View className="flex flex-col items-center p-4 gap-y-8 w-full">
        <View className="size-1/2">
          <NoDataSvg />
        </View>
        <Text className="text-foreground text-center">{t('Timetable.error.noData')}</Text>
        <Button
            text="Spróbuj ponownie"
            onPress={refetch}
        />
      </View>
    )
  }