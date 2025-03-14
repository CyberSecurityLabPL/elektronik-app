import { Dispatch, SetStateAction } from "react";
import { Group } from "./group/Group";
import { Bone, DoorOpen, GraduationCap, Users } from "lucide-react-native";

export const TypeSelect = ({
    selectedTimetable,
    setSelectedTimetable,
    setBottomSheetIndex,
    searchParam
}: {
    selectedTimetable: string,
    setSelectedTimetable: Dispatch<SetStateAction<string>>
    setBottomSheetIndex: Dispatch<SetStateAction<number>>
    searchParam: string
}) => {
    return (
        <>
            <Group
                name="Klasy"
                LucideIcon={GraduationCap}
                filter="class"
                selectedTimetable={selectedTimetable}
                setSelectedTimetable={setSelectedTimetable}
                setBottomSheetIndex={setBottomSheetIndex}
                searchParam={searchParam}
            />
            <Group
                name="Nauczyciele"
                LucideIcon={Users}
                filter="teacher"
                selectedTimetable={selectedTimetable}
                setSelectedTimetable={setSelectedTimetable}
                setBottomSheetIndex={setBottomSheetIndex}
                searchParam={searchParam}
            />
            <Group
                name="Sale"
                LucideIcon={DoorOpen}
                filter="classroom"
                selectedTimetable={selectedTimetable}
                setSelectedTimetable={setSelectedTimetable}
                setBottomSheetIndex={setBottomSheetIndex}
                searchParam={searchParam}
            />
        </>
    );
};