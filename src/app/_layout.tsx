import ThemeProvider from "@/components/Providers/ThemeProvider"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import "../global.css"
import QueryProvider from "@/components/Providers/QueryProvider"

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	// Font loading
	const [loaded, error] = useFonts({
		"Poppins-Bold": require("@/assets/fonts/poppins/Poppins-Bold.ttf"),
		"Poppins-Medium": require("@/assets/fonts/poppins/Poppins-Medium.ttf"),
		"Poppins-Regular": require("@/assets/fonts/poppins/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("@/assets/fonts/poppins/Poppins-SemiBold.ttf"),
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<QueryProvider>
			<ThemeProvider>
				<RootLayoutNav />
			</ThemeProvider>
		</QueryProvider>
	)
}

function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="(welcome)/index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="(welcome)/about-app"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	)
}
