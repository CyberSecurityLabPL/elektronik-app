import { cn } from "@/lib/utils"
import React, { useEffect } from "react"
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native"
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

interface SwitchProps extends TouchableWithoutFeedbackProps {
  isEnabled: boolean
  onToggle?: () => void
}

const Switch = ({ isEnabled, onToggle, ...props }: SwitchProps) => {
  // Set initial value based on isEnabled prop
  const switchTranslate = useSharedValue(isEnabled ? 24 : 4)

  useEffect(() => {
    // Only animate after initial render
    switchTranslate.value = withTiming(isEnabled ? 24 : 4, {
      duration: 300,
      easing: Easing.out(Easing.circle),
      reduceMotion: ReduceMotion.System,
    })
  }, [isEnabled, switchTranslate])

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: switchTranslate.value,
        },
      ],
    }
  })

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onToggle?.()
      }}
      {...props}
    >
      <Animated.View
        className={cn(
          isEnabled ? "bg-primary" : "bg-zinc-600",
          "w-14 h-8 rounded-3xl justify-center transition-colors duration-200",
        )}
      >
        <Animated.View
          style={customSpringStyles}
          className="w-6 h-6 rounded-full bg-white shadow-black"
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Switch
