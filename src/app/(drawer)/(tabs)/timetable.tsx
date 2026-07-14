import ScreenWrapper from "@/components/ScreenWrapper"
import { TimetableHeader } from "@/components/timetable/Header"
import { TimetableContainer } from "@/components/timetable/TimetableContainer"

const Timetable = () => {
    return (
        <ScreenWrapper
            edges={["top", "left", "right"]}
            className="flex justify-top items-center w-full h-full px-0 pb-0"
        >
            <TimetableHeader />
            <TimetableContainer />
        </ScreenWrapper>
    )
}

export default Timetable