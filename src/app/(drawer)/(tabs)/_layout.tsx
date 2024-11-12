import TabBar from "@/components/navigation/TabBar"
import { Tabs, usePathname } from "expo-router"
import { Calendar, Home, Newspaper, Repeat, Table } from "lucide-react-native"
import React from "react"

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
				headerTransparent: true,
				tabBarStyle: {
					display: usePathname() === "radio" ? "none" : "flex",
				},
			}}
			initialRouteName="home"
			tabBar={(props) => <TabBar {...props} />}
		>
			<Tabs.Screen
				name="substitutions"
				options={({ navigation, route }) => ({
					tabBarIcon: Repeat,
				})}
			/>
			<Tabs.Screen
				name="timetable"
				options={({ route, navigation }) => ({
					tabBarIcon: Table,
				})}
			/>
			<Tabs.Screen
				name="home"
				options={({ navigation, route }) => ({
					tabBarIcon: Home,
				})}
			/>
			<Tabs.Screen
				name="(news)"
				options={({ navigation, route }) => ({
					tabBarIcon: Newspaper,
				})}
			/>
			<Tabs.Screen
				name="events"
				options={({ navigation, route }) => ({
					tabBarIcon: Calendar,
				})}
			/>
			<Tabs.Screen
				name="radio"
				options={{
					href: null,
					tabBarIcon: Calendar,
					tabBarStyle: { display: "none" },
				}}
			/>
		</Tabs>
	)
}
