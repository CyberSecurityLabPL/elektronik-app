import { Stack } from "expo-router"
import { View } from "react-native"

export default function Layout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="language"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="notifications"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	)
}
