import { useState } from "react"
import { WeekTab } from "./WeekTab"
import { Table } from "./Table"
import { getCurrentDay } from "@/lib/utils"
import { TimetableSelector } from "./selector/Selector"
import { View } from "react-native"
import { SelectorButton } from "./selector/Button"
import { useUserData } from "@/hooks/useUserData"

const defaultTimetable = 'o1'

export const TimetableContainer = () => {
    const userData = useUserData()
    const [day, setDay] = useState<number>(getCurrentDay() > 4 ? 0 : getCurrentDay())
    /**
     * Set bottom sheet index (is open and how much)
     * @type {number} -1 is closed, 0 is half opened, 1 is full opened
     * @default -1
     */
    const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1)

    const [selectedTimetable, setSelectedTimetable] = useState(
        userData?.grade ?? defaultTimetable,
    )

    return (
        <>
        <View className="h-24">
            <WeekTab
                weekDay={day}
                setWeekDay={setDay}
            />
        </View>
        <View className="flex mt-4">
            <Table
                selectedDay={day}
                selectedTimetable={selectedTimetable}
            />
        </View>
        <View className="w-full absolute bottom-6 bg-background flex justify-center items-center p-4 pb-8 border-y border-y-background-secondary">
            <SelectorButton
                selectedTimetable={selectedTimetable}
                setBottomSheetIndex={setBottomSheetIndex}
            />
        </View>
        <TimetableSelector
            bottomSheetIndex={bottomSheetIndex}
            setBottomSheetIndex={setBottomSheetIndex}
            selectedTimetable={selectedTimetable}
            setSelectedTimetable={setSelectedTimetable}
        />
        </>
    )
}