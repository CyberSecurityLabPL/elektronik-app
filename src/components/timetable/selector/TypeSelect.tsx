import { Dispatch, SetStateAction } from "react";
import { Group } from "./group/Group";
import { Bone, DoorOpen, GraduationCap, Users } from "lucide-react-native";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation()
    return (
        <>
            <Group
                name={t('Timetable.bottomSheet.class')}
                LucideIcon={GraduationCap}
                filter="class"
                selectedTimetable={selectedTimetable}
                setSelectedTimetable={setSelectedTimetable}
                setBottomSheetIndex={setBottomSheetIndex}
                searchParam={searchParam}
            />
            <Group
                name={t('Timetable.bottomSheet.teacher')}
                LucideIcon={Users}
                filter="teacher"
                selectedTimetable={selectedTimetable}
                setSelectedTimetable={setSelectedTimetable}
                setBottomSheetIndex={setBottomSheetIndex}
                searchParam={searchParam}
            />
            <Group
                name={t('Timetable.bottomSheet.classRoom')}
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