import { useTimetableInfo } from "@/hooks/timetable/useTimetable"
import useColors from "@/hooks/useColors"
import { Dispatch, memo, SetStateAction, useCallback, useMemo, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { GroupItem } from "./GroupItem"
import Button from "@/components/ui/Button"
import { useTranslation } from "react-i18next"

export const GroupData = memo(({
    filter,
    selectedTimetable,
    setSelectedTimetable,
    setIsOpen,
    setBottomSheetIndex,
    searchParam
}: {
    filter: string
    selectedTimetable: string
    setSelectedTimetable: Dispatch<SetStateAction<string>>,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setBottomSheetIndex: Dispatch<SetStateAction<number>>
    searchParam: string
}) => {
    const colors = useColors()
    const { t } = useTranslation()
    const [itemsToShow, setItemsToShow] = useState<number>(10)
    const {
        data,
        isLoading,
        refetch,
        isRefetching,
        isError
    } = useTimetableInfo({ filter })

    const { displayedData, hasMoreItems } = useMemo(() => {
        if (!Array.isArray(data)) return { displayedData: [], hasMoreItems: false };
        
        // Apply search filter or pagination based on searchParam
        const filteredData = searchParam 
            ? data.filter(item => item.name.toLowerCase().includes(searchParam.toLowerCase()))
            : data.slice(0, itemsToShow);
        
        // Only check for more items when not searching
        const hasMore = !searchParam && Array.isArray(data) && itemsToShow < data.length;
        
        return { displayedData: filteredData, hasMoreItems: hasMore };
    }, [data, itemsToShow, searchParam]);

    const handleLoadMore = useCallback(() => {
        setItemsToShow(prev => prev + 10);
    }, []);

    if (isLoading || isRefetching) return <LoadingSkeleton />
    if (!data || isError) return <TryAgain refetch={() => refetch()} />

    return (
        <View className="px-3">
            {displayedData.map((item) => (
                    <GroupItem
                        key={item.id}
                        item={item}
                        selectedTimetable={selectedTimetable}
                        setSelectedTimetable={setSelectedTimetable}
                        setIsOpen={setIsOpen}
                        setBottomSheetIndex={setBottomSheetIndex}
                    />
                )
            )}
            {!searchParam && hasMoreItems && (
                <Pressable 
                    className="p-3 my-2 bg-primary rounded-lg items-center"
                    onPress={handleLoadMore}
                    android_ripple={{ color: colors.primary + '80' }}
                >
                    <Text className="text-background font-medium">{t('Timetable.bottomSheet.loadMore')}</Text>
                </Pressable>
            )}
        </View>
    )
})

const LoadingSkeleton = () => {
    return (
        <View className="flex flex-col gap-y-2">
            {Array(5)
                .fill('')
                .map((_, i) => (
                    <View className="w-full px-5" key={`loading-skeleton-${i}`}>
                        <View className="animate-pulse px-5 h-20 bg-background-secondary rounded-lg"/>
                    </View>
                ))}
        </View>
    )
}

const TryAgain = ({ refetch }: { refetch: () => void }) => {
    const { t } = useTranslation()

    return (
        <View className="px-5">
            <Text className="text-center text-red-500">{t('Timetable.error.bottomSheet.data')}</Text>
            <Button
                text="Spróbuj ponownie"
                className="mt-4"
                onPress={() => refetch()}
            />
        </View>
    )
}