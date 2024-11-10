import { View, Text, BackHandler } from "react-native"
import React, { useEffect } from "react"
import ScreenWrapper from "@/components/ScreenWrapper"
import { router } from "expo-router"

const profile = () => {
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
			<Text>Profile</Text>
		</ScreenWrapper>
	)
}

export default profile
