import ScreenWrapper from "@/components/ScreenWrapper"
import { Link, router } from "expo-router"
import { useEffect } from "react"
import { BackHandler, Text } from "react-native"

const Settings = () => {
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
			<Text>Settings page</Text>
			<Link href="/(drawer)/(tabs)/home" asChild>
				<Text className="text-white">Go back</Text>
			</Link>
		</ScreenWrapper>
	)
}

export default Settings
