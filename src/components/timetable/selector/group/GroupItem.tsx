import useColors from "@/hooks/useColors"
import { cn } from "@/lib/utils"
import { Dispatch, memo, SetStateAction, useCallback } from "react"
import { Text, Keyboard, Pressable } from "react-native"

type GroupItemType = {
    id: string
    name: string
  }

export const GroupItem = memo(({
    item,
    selectedTimetable,
    setSelectedTimetable,
    setIsOpen,
    setBottomSheetIndex
}: {
    item: GroupItemType
    selectedTimetable: string
    setSelectedTimetable: Dispatch<SetStateAction<string>>
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setBottomSheetIndex: Dispatch<SetStateAction<number>>
}) => {
    const colors = useColors()

    const handlePress = useCallback(() => {
        setSelectedTimetable(item.id)
        Keyboard.dismiss()
        setIsOpen(false)
        setBottomSheetIndex(-1)
    }, [])

    return (
        <Pressable 
            className={cn("px-6 py-5 my-1 bg-background-secondary rounded-lg flex flex-row", {
                "bg-primary/30 border border-primary": selectedTimetable === item.id
            })}
            android_ripple={{ color: colors.backgroundSecondary }}
            onPress={handlePress}
        >
            { (item.id.startsWith('o'))
                && (
                    <>
                        <Text className="font-bold text-foreground">
                            {item.name.slice(0, 4)
                            }
                        </Text>
                        <Text className="text-foreground">
                            {item.name.slice(5)}
                        </Text>
                    </>
            )}
            {item.id.startsWith('s')
                && (
                    <>
                        <Text className="font-bold text-foreground">
                            {item.name.slice(0, (item.name.startsWith('W')
                                || item.name.startsWith('0')
                                || item.name.startsWith('D'))
                                ? 3
                                : 2
                            )}
                        </Text>
                        <Text className="text-foreground">
                            {item.name.slice((item.name.startsWith('W')
                                || item.name.startsWith('0')
                                || item.name.startsWith('D'))
                                ? 3
                                : 2
                            )}
                        </Text>
                    </>
            )}
            {item.id.startsWith('n') && (
                <>
                    <Text className="text-foreground">
                        {item.name.slice(0, -5)}
                    </Text>
                    <Text className="font-bold text-foreground">
                        {item.name.slice(-5)}
                    </Text>
                </>
        )}
        </Pressable>
    )
})