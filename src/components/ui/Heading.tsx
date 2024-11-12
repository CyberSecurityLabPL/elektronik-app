import { View, Text } from "react-native"
import React from "react"
import IconButton from "./IconButton"
import { AlignRight, ChevronLeft } from "lucide-react-native"
import { router } from "expo-router"

interface headingProps {
	title: string
	homeScreen?: boolean
	settingsScreen?: boolean
}
const Heading = ({ title, homeScreen, settingsScreen }: headingProps) => {
	// TODO: when layout will be done change console logs to router.push etc.

	if (homeScreen) {
		return (
			<View className="w-full flex flex-col pt-6">
				<View className="flex flex-row justify-end">
					<IconButton
						LucideIcon={AlignRight}
						iconColor="white"
						onPress={() => console.log("menu")}
					/>
				</View>

				<View className="flex flex-col gap-1 ">
					<Text className="text-foreground-secondary text-base ">
						Dzień dobry,
					</Text>

					<Text className="text-foreground font-psemibold text-2xl">
						{title}
					</Text>
				</View>
			</View>
		)
	}
	if (settingsScreen) {
		return (
			<View className="w-full flex flex-col pt-6 gap-4">
				<View className="flex flex-row justify-start">
					<IconButton
						LucideIcon={ChevronLeft}
						iconColor="white"
						onPress={() => router.back()}
					/>
				</View>
				<Text className="text-foreground font-psemibold text-2xl">{title}</Text>
			</View>
		)
	}
	return (
		<View className="w-full flex flex-col pt-6">
			<View className="flex flex-row justify-end">
				<IconButton
					LucideIcon={AlignRight}
					iconColor="white"
					onPress={() => console.log("menu")}
				/>
			</View>

			<Text className="text-foreground font-psemibold text-2xl">{title}</Text>
		</View>
	)
}

export default Heading
