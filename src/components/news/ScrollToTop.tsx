import { RefObject } from "react"
import { Animated } from "react-native"
import IconButton from "../ui/IconButton"
import { ChevronUp } from "lucide-react-native"

export const ScrollToTop = <T extends Animated.FlatList<any>>({
    scrollY,
    listRef
}: {
    scrollY: Animated.Value,
    listRef: RefObject<T>
}) => {
    // Create animated visibility values derived from scrollY
    const buttonOpacity = scrollY.interpolate({
        inputRange: [300, 400],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const buttonTranslateY = scrollY.interpolate({
        inputRange: [300, 400],
        outputRange: [24, 0],
        extrapolate: 'clamp'
    })

    return (
        <Animated.View
            style={[{
                position: 'absolute',
                bottom: 20,
                alignSelf: 'center',
                opacity: buttonOpacity,
                transform: [{ translateY: buttonTranslateY }],
                zIndex: 10,
            }]}
        >
            <IconButton
                LucideIcon={ChevronUp}
                iconColor={"#FFF"}
                className="bg-primary"
                onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}
            />
        </Animated.View>
    )
}