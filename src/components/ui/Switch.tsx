import { cn } from "@/lib/utils"
import React, { useEffect } from "react"
import {
	TouchableWithoutFeedback,
	TouchableWithoutFeedbackProps,
} from "react-native"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated"

interface SwitchProps extends TouchableWithoutFeedbackProps {
	isEnabled: boolean
	onToggle: () => void
}

const Switch = ({ isEnabled, onToggle, ...props }: SwitchProps) => {
	const switchTranslate = useSharedValue(0)

	useEffect(() => {
		if (isEnabled) {
			switchTranslate.value = 24
		} else {
			switchTranslate.value = 4
		}
	}, [isEnabled, switchTranslate])

	const customSpringStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(switchTranslate.value, {
						mass: 1,
						damping: 15,
						stiffness: 120,
						overshootClamping: false,
						restSpeedThreshold: 0.001,
						restDisplacementThreshold: 0.001,
					}),
				},
			],
		}
	})

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				onToggle()
			}}
			{...props}
		>
			<Animated.View
				className={cn(
					isEnabled ? "bg-purple-400 " : "bg-zinc-600 ",
					"w-14 h-8 rounded-3xl justify-center transition-colors duration-500 ",
				)}
			>
				<Animated.View
					style={customSpringStyles}
					className={"w-6 h-6 rounded-full bg-white shadow-black "}
				/>
			</Animated.View>
		</TouchableWithoutFeedback>
	)
}

export default Switch
