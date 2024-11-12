import ScreenWrapper from "@/components/ScreenWrapper"
import { Link, router } from "expo-router"
import React, { useEffect } from "react"
import { BackHandler, Text } from "react-native"

const radioElektron = () => {
	useEffect(() => {
		const backAction = () => {
			router.navigate("/(drawer)/(tabs)/home")
			return true
		}

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction,
		)

		return () => backHandler.remove()
	}, [])

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
