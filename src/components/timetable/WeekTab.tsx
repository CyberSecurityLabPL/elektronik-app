import { View } from "react-native"
import DayTab from "./DayTab"
import { getDayOfWeek, localeFormat } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"


export const WeekTab = ({ weekDay, setWeekDay }: { weekDay: number, setWeekDay: Dispatch<SetStateAction<number>> }) => {
    return (
        <View className="h-full flex flex-row items-center justify-between w-full gap-x-2">
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