import ScreenWrapper from "@/components/ScreenWrapper"
import { Link, useLocalSearchParams } from "expo-router"
import { View, Text, StyleSheet } from "react-native"

export default function articleScreen() {
	const { id } = useLocalSearchParams()

	return (
		<ScreenWrapper>
			<Text>Details of article {id} </Text>
			<Link href="/(tabs)/(news)" asChild>
				<Text className="text-white">Navigate to news</Text>
			</Link>
		</ScreenWrapper>
	)
}
