import { View } from "react-native"
import DayTab from "./DayTab"
import { getDayOfWeek, localeFormat } from "@/lib/utils"
import { allDays } from "@/types/days"
import { Dispatch, SetStateAction } from "react"

export const WeekTab = ({ weekDay, setWeekDay }: { weekDay: number, setWeekDay: Dispatch<SetStateAction<number>> }) => {
    return (
        <View className="flex-row justify-between items-center pb-6 px-5 w-full gap-x-1">
            {Array(5)
                .fill('')
                .map((_, i) => (
                    <DayTab
                        key={`day-tab-${i}`}
                        day={localeFormat(getDayOfWeek(i+1), 'EEEEEE.')}
                        date={localeFormat(getDayOfWeek(i+1), 'dd.MM')}
                        onPress={() => {
                            setWeekDay(i)
                        }}
                        active={weekDay === i}
                    />
                ))}
        </View>
    )
}