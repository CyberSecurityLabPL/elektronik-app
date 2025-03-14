import Input from "@/components/ui/Input"
import useColors from "@/hooks/useColors"
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { Dispatch, SetStateAction, Suspense, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Keyboard, View } from "react-native"
import { TypeSelect } from "./TypeSelect"

export const TimetableSelector = ({
    bottomSheetIndex,
    setBottomSheetIndex,
    selectedTimetable,
    setSelectedTimetable
}: {
    bottomSheetIndex: number,
    setBottomSheetIndex: Dispatch<SetStateAction<number>>,
    selectedTimetable: string,
    setSelectedTimetable: Dispatch<SetStateAction<string>>
}) => {
    const colors = useColors()
    const { t } = useTranslation()
    const [searchParam, setSearchParam] = useState<string>('')

    const handleClose = () => {
        Keyboard.dismiss()
        setBottomSheetIndex(-1)
    }

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
          />
        ),
        [],
    )

    return (
        <BottomSheet
            index={bottomSheetIndex}
            snapPoints={['90%']}
            detached
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: colors.foreground }}
            backgroundStyle={{ backgroundColor: colors.background }}
            enablePanDownToClose
            onClose={handleClose}
        >
            <BottomSheetScrollView 
                contentContainerClassName='p-4 pb-16'
            >
                <Input
                    type="text"
                    onChangeText={(text) => setSearchParam(text)}
                    placeholder={t('Timetable.bottomSheet.search')}
                    onFocus={() => setBottomSheetIndex(1)}
                    onEndEditing={() => setBottomSheetIndex(0)}
                />
                <View className="mt-4">
                    <Suspense fallback={<LoadingSkeleton />}>
                        <TypeSelect
                            selectedTimetable={selectedTimetable}
                            setSelectedTimetable={setSelectedTimetable}
                            setBottomSheetIndex={setBottomSheetIndex}
                            searchParam={searchParam}
                        />
                    </Suspense>
                </View>
            </BottomSheetScrollView>    
        </BottomSheet>
    )
}

const LoadingSkeleton = () => (
    <View className="px-3 animate-pulse flex-flex-col gap-y-4">
        {Array(3)
            .fill('')
            .map((_, i) => (
                <View className="flex flex-row items-center justify-between">
                    <View className="w-1/4 h-20 bg-background-secondary rounded-lg" />
                    <View className="w-2/3 h-20 bg-background-secondary rounded-lg" />
                </View>
        ))}
    </View>
)