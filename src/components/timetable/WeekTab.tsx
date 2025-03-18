import { View, ScrollView, Animated } from "react-native"
import DayTab from "./DayTab"
import { getDayOfWeek, localeFormat } from "@/lib/utils"
import { Dispatch, SetStateAction, useRef } from "react"
import useColors from "@/hooks/useColors"
import { LinearGradient } from 'expo-linear-gradient'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const WeekTab = ({ weekDay, setWeekDay }: { weekDay: number, setWeekDay: Dispatch<SetStateAction<number>> }) => {
    const colors = useColors()
    const scrollViewRef = useRef<ScrollView>(null)
    const scrollX = useRef(new Animated.Value(0))

    const rightGradientOpacity = scrollX.current.interpolate({
        inputRange: [0, 30],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    })

    const leftGradientOpacity = scrollX.current.interpolate({
        inputRange: [0, 30],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })

    return (
        <View className="w-11/12 h-full">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                contentContainerClassName="gap-x-2 flex items-center justify-center relative"
                scrollEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX.current } } }],
                    { useNativeDriver: false }
                )}
            >
                {Array(5)
                    .fill('')
                    .map((_, i) => (
                        <DayTab
                            key={`day-tab-${i}`}
                            day={localeFormat(getDayOfWeek(i+1), 'EEEEEE.')}
                            date={localeFormat(getDayOfWeek(i+1), 'dd.MM')}
                            onPress={() => {
                                setWeekDay(i)
                            }}
                            active={weekDay === i}
                        />
                    ))}
            </ScrollView>
            <View className="absolute right-0 h-full" pointerEvents="none">
                <AnimatedLinearGradient
                    className="w-12 h-full flex items-center justify-center"
                    colors={['transparent', colors.background]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ opacity: rightGradientOpacity }}
                />
            </View>
            <View className="absolute left-0 h-full" pointerEvents="none">
                <AnimatedLinearGradient
                    className="w-10 h-full flex items-center justify-center"
                    colors={['transparent', colors.background]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={{ opacity: leftGradientOpacity }}
                />
            </View>
        </View>
    )
}