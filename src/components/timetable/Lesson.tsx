import { View, Text, PressableProps, Pressable } from "react-native"
import React, { useMemo, useCallback, memo } from "react"
import { Clock, X } from "lucide-react-native"
import { useColorScheme } from "nativewind"
import Modal from "../ui/Modal"
import { useState } from "react"
import IconButton from "../ui/IconButton"
import useColors from "@/hooks/useColors"
import { SingleTimetableInfo, TimetableInfoResponse } from "@/hooks/timetable/types"
import { useTranslation } from "react-i18next"

interface LessonProps {
    teacherId: string
    period: number
    time: string
    subject: string
    initials: string
    room: string
    teachersData: TimetableInfoResponse | undefined
    props?: PressableProps
    showGroup?: boolean
    groupNumber?: string
    teacherView?: boolean
    lessonClass: string
}

const LessonContent = memo(({
    teacher,
    subject,
    room,
    time,
    onClose,
    showGroup,
    groupNumber,
    lessonClass,
    teacherView = false
}: {
    teacher: SingleTimetableInfo | null | undefined
    subject: string
    room: string
    time: string
    onClose: () => void
    showGroup?: boolean
    groupNumber?: string,
    lessonClass: string,
    teacherView?: boolean
}) => {
    const colors = useColors()
    const { t } = useTranslation()

    return (
        <View className="bg-background w-10/12 h-fit rounded-3xl px-9 py-7 flex items-center justify-between">
            <View className="gap-3 w-full h-fit">
                <View>
                    <Text className="text-foreground font-pregular text-lg">
                        {t('Timetable.categories.course')}
                    </Text>
                    <Text className="font-psemibold text-gray-700 dark:text-gray-400 text-2xl">
                        {subject} {showGroup && groupNumber}
                    </Text>
                </View>
                <View>
                    <Text className="text-foreground font-pregular text-lg">
                        {t('Timetable.categories.teacher')}
                    </Text>
                    <Text className="font-pregular text-gray-700 dark:text-gray-400 text-2xl">
                        {teacher?.name}
                    </Text>
                </View>
                <View>
                    <Text className="text-foreground font font-pregular text-lg">
                        {t('Timetable.categories.classroom')}
                    </Text>
                    <Text className="font-pregular text-gray-700 dark:text-gray-400 text-2xl">
                        {room}
                    </Text>
                </View>
                { teacherView && (
                    <View>
                        <Text className="text-foreground font font-pregular text-lg">
                            {t('Timetable.categories.lessonClass')}
                        </Text>
                        <Text className="font-pregular text-gray-700 dark:text-gray-400 text-2xl">
                            {lessonClass}
                        </Text>
                    </View>
                )}
                <View>
                    <Text className="text-foreground font-pregular text-lg">
                        {t('Timetable.categories.hours')}
                    </Text>
                    <Text className="font-pregular text-gray-700 dark:text-gray-400 text-2xl">
                        {time}
                    </Text>
                </View>
            </View>
            <View className="flex items-center h-fit mt-4">
                <IconButton
                    LucideIcon={X}
                    iconColor={colors.closeButton}
                    onPress={onClose}
                />
            </View>
        </View>
    )
});

const Lesson = memo(({
    teacherId,
    period,
    time,
    subject,
    initials,
    room,
    teachersData: teachers,
    props,
    showGroup = false,
    groupNumber,
    teacherView = false,
    lessonClass
}: LessonProps) => {
    const [modalOpen, setModalOpen] = useState(false)

    const { colorScheme } = useColorScheme()
    const isDark = colorScheme === "dark"

    // Memoize teacher lookup to avoid recalculation on each render
    const teacher = useMemo(() => {
        if (!modalOpen || !teachers) return null;
        return teachers.find((teacher) => teacher.id === teacherId);
    }, [modalOpen, teachers, teacherId]);

    // Memoize event handlers
    const handleOpenModal = useCallback(() => {
        setModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    // Format initials only once per render
    const displayInitials = useMemo(() => {
        return initials.length > 8 ? initials.slice(0, 8) + "..." : initials;
    }, [initials]);

    return (
        <View className="rounded-3xl overflow-hidden mb-2">
            <Pressable
                android_ripple={{ color: isDark ? "#00000030" : "#62586630" }}
                className="w-full rounded-3xl bg-background px-5 py-4 flex flex-row justify-between items-center border border-[#CFD4DD50] dark:border-[#47474750]"
                onPress={handleOpenModal}
                {...props}
            >
                <View className="flex flex-row justify-center items-center gap-5">
                    <View className="flex justify-center items-center bg-primary/10 px-4 py-1 rounded-xl w-[40px] h-[35px]">
                        <Text className="text-2xl font-psemibold text-primary">
                            {period}
                        </Text>
                    </View>
                    <View className="flex justify-center items-start">
                        <Text
                            className={`text-xl font-psemibold text-[#111827] dark:text-[#DEDEDE]`}
                        >
                            {subject} {showGroup && groupNumber}
                        </Text>
                        <View className="flex flex-row justify-center items-center gap-[0.15rem]">
                            <Clock size={12} color={"#6D6D6D"} />
                            <Text className="text-base text-[#6B7280] dark:text-[#6D6D6D]">
                                {time}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="flex flex-row justify-center items-center dark:bg-zinc-600/20 bg-zinc-200/20 px-3 py-1 rounded-md">
                    <Text className="text-[#6D6D6D] text-1xl">
                        {!teacherView
                            ? `${displayInitials} ${room}`
                            : `${lessonClass} ${room}`
                        }
                    </Text>
                </View>
            </Pressable>

            {modalOpen && (
                <Modal isOpen={modalOpen} onClose={handleCloseModal}>
                    <LessonContent
                        teacher={teacher}
                        subject={subject}
                        room={room}
                        time={time}
                        lessonClass={lessonClass}
                        onClose={handleCloseModal}
                        showGroup={showGroup}
                        groupNumber={groupNumber}
                        teacherView={teacherView}
                    />
                </Modal>
            )}
        </View>
    )
}, (prevProps, nextProps) => {
    // Return true if props are equal (no re-render needed)
    return prevProps.subject === nextProps.subject &&
           prevProps.period === nextProps.period &&
           prevProps.time === nextProps.time &&
           prevProps.initials === nextProps.initials &&
           prevProps.room === nextProps.room
});

export default Lesson;
