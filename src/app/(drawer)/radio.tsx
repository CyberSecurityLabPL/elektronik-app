import ScreenWrapper from "@/components/ScreenWrapper"
import { Link } from "expo-router"
import React from "react"
import { Text } from "react-native"

const radioElektron = () => {
	return (
		<ScreenWrapper className="mt-0 h-screen">
			<Text>radioElektron</Text>
			{/* @ts-expect-error */}
			<Link href="(drawer)/(tabs)/home" asChild>
				<Text className="text-white">Go back</Text>
			</Link>
		</ScreenWrapper>
	)
}

export default radioElektron
