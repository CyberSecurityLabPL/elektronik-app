import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import Sidebar from "@/components/navigation/Sidebar"

export default function Layout() {
	return (
		<GestureHandlerRootView className="flex-1 min-h-screen">
			<Drawer
				screenOptions={{
					headerShown: false,
					swipeEnabled: false,
					drawerType: "slide",
				}}
				// drawerContent={Sidebar}
			>
				<Drawer.Screen
					name="(tabs)"
					options={{
						drawerLabel: "Home",
						title: "Home",
					}}
				/>
				<Drawer.Screen
					name="radio"
					options={{
						drawerLabel: "Radio Elektron",
						title: "Radio Elektron",
					}}
				/>
				<Drawer.Screen
					name="(settings)"
					options={{
						drawerLabel: "Settings",
						title: "Settings",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	)
}
