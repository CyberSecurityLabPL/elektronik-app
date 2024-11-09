import { Stack } from "expo-router"

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
