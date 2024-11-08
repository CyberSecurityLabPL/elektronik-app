import React from "react"
import { Pressable, PressableProps, Text } from "react-native"

const Button = ({
	variant,
	text,
}: PressableProps & { variant?: "primary" | "ghost"; text: string }) => {
	if (variant == "ghost") {
		return (
			<Pressable className="  p-4 text-center rounded-3xl active:bg-foreground/10 transition-colors">
				<Text className="text-primary text-center font-pregular text-base">
					{text}
				</Text>
			</Pressable>
		)
	}
	return (
		<Pressable className="bg-primary  p-4 text-center rounded-3xl active:bg-primary/90 transition-colors">
			<Text className="text-white text-center font-pregular text-lg">
				{text}
			</Text>
		</Pressable>
	)
}

export default Button
