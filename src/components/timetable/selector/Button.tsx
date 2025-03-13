import { useTimetableAllInfo } from "@/hooks/timetable/useTimetable"
import useColors from "@/hooks/useColors"
import { Dispatch, memo, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import { Text, Pressable } from "react-native"

export const SelectorButton = memo(({
    selectedTimetable,
    setBottomSheetIndex
}: {
    selectedTimetable: string,
    setBottomSheetIndex: Dispatch<SetStateAction<number>>
}) => {
    const { t } = useTranslation()
    const colors = useColors()

    const {
        data: info,
    } = useTimetableAllInfo()

    return (
        <Pressable
            className="flex w-full justify-center items-center bg-background-secondary mb-2 p-2 px-16 rounded-2xl"
            onPress={() => setBottomSheetIndex(0)}
            android_ripple={{ color: colors.background }}
        >
            <Text className="font-pmedium text-xl text-foreground">
                {info
                    ? info
                        ?.find((el) => el.id === selectedTimetable)
                        ?.id.toLowerCase()
                        .includes("o")
                        ? info
                            ?.find((el) => el.id === selectedTimetable)
                            ?.name.split(" ")[0]
                        : info?.find((el) => el.id === selectedTimetable)?.name
                    : t('Timetable.none')}
            </Text>
            <Text className="font-pregular text-foreground">
                {t('Timetable.button')}
            </Text>
        </Pressable>
    )
})