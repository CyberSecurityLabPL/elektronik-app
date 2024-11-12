import { View, Text, BackHandler } from "react-native"
import React, { useEffect } from "react"
import ScreenWrapper from "@/components/ScreenWrapper"
import { router } from "expo-router"

const notifications = () => {
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
		<ScreenWrapper>
			<Text>notifications</Text>
		</ScreenWrapper>
	)
}

export default notifications
