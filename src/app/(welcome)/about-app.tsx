import { Text, Pressable, View } from "react-native"
import React from "react"
import { Link, router } from "expo-router"
import ScreenWrapper from "@/components/ScreenWrapper"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import Button from "@/components/ui/Button"
import { AboutSvg } from "@/components/svgs/AboutSvg"

const AboutApp = () => {
	return (
		<ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
			<View className="flex flex-col justify-center items-center w-full gap-20">
				<View className="flex justify-start items-center">
					<ProgressIndicator progress={2} />
				</View>
				<View className="flex justify-center items-center w-full flex-col h-fit p-2 gap-8">
					<View>
						<AboutSvg />
					</View>
					<View className="flex justify-center items-center w-full flex-col p-2 gap-1">
						<Text className="font-psemibold text-5xl text-foreground text-center py-2">
							Elektronik
						</Text>
						<Text className="font-pregular text-base text-foreground text-center px-5">
							Elektron++ to aplikacja dla uczniów, która Pomaga uczniom dzięki
							funkcjom takim jak plan lekcji, informacje o zastępstwach.
						</Text>
					</View>
				</View>
			</View>
			<View className="flex justify-center w-full items-center flex-col">
				<Button text="Kontynuuj" onPress={() => router.navigate("/set-up")} />
			</View>
		</ScreenWrapper>
	)
}

export default AboutApp
