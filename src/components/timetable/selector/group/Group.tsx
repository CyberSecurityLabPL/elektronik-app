import useColors from "@/hooks/useColors";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react-native";
import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { Pressable, View, Text } from "react-native";
import { GroupData } from "./GroupData";

export const GroupComponent = ({
    name,
    LucideIcon,
    filter,
    selectedTimetable,
    setSelectedTimetable,
    setBottomSheetIndex,
    searchParam
}: {
    name: string
    LucideIcon: LucideIcon
    filter: string,
    selectedTimetable: string,
    setSelectedTimetable: Dispatch<SetStateAction<string>>
    setBottomSheetIndex: Dispatch<SetStateAction<number>>
    searchParam: string
}) => {
    const colors = useColors()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), [])

    return (
        <View>
            <Pressable
                className="flex w-full flex-row justify-between items-center p-4"
                onPress={toggleOpen}
                android_ripple={{ color: colors.backgroundSecondary }}
                >
                <View className="flex flex-row gap-x-4 items-center">
                    <View className="p-4 bg-background-secondary rounded-2xl">
                        <LucideIcon size={32} color={colors.foreground} />
                    </View>
                    <Text className="text-foreground font-psemibold text-2xl">
                        {name}
                    </Text>
                </View>
                {(searchParam.length >= 1 || isOpen) 
                    ? <ChevronUp size={32} color={colors.foreground} />
                    : <ChevronDown size={32} color={colors.foreground} />
                }
            </Pressable>
            {(searchParam.length >= 1 || isOpen) && (
                <GroupData
                    filter={filter}
                    selectedTimetable={selectedTimetable}
                    setSelectedTimetable={setSelectedTimetable}
                    setIsOpen={setIsOpen}
                    setBottomSheetIndex={setBottomSheetIndex}
                    searchParam={searchParam}
                />
            )}
        </View>
    )
}

export const Group = memo(GroupComponent)