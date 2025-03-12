import { useState } from "react"
import { WeekTab } from "./WeekTab"
import { Table } from "./Table"
import { getCurrentDay } from "@/lib/utils"

export const TimetableContainer = () => {
    const [day, setDay] = useState<number>(getCurrentDay() > 4 ? 0 : getCurrentDay())

    return (
        <>
        <WeekTab
            weekDay={day}
            setWeekDay={setDay}
        />
        <Table
            selectedDay={day}
        />
        </>
    )
}