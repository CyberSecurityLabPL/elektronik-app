import { Text, Pressable, View } from "react-native"
import React from "react"
import { Link, router } from "expo-router"
import ScreenWrapper from "@/components/ScreenWrapper"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import Button from "@/components/ui/Button"
import { AboutSvg } from "@/components/svgs/AboutSvg"
import BottomLine from "@/components/svgs/BottomLine"
import UpperLine from "@/components/svgs/UpperLine"
import Square from "@/components/svgs/Square"
import SmallSquares from "@/components/svgs/SmallSquares"
import Circles from "@/components/svgs/Circles"
import Lines from "@/components/svgs/Lines"
import useColors from "@/hooks/useColors"

const AboutApp = () => {
	const colors = useColors()
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

			<View className="absolute bottom-64 -right-32 -z-10"></View>
			<View className="absolute top-64 -left-36 -z-10">
				<Lines color={colors.svg.lines} />
			</View>
			<View className="absolute top-24 right-28 -z-10">
				<SmallSquares color={colors.svg.smallSquares} />
			</View>
			<View className="absolute top-6 -left-28 -z-10">
				<UpperLine color={colors.svg.upperLine} />
			</View>
			<View className="absolute top-56 -right-44 -z-10">
				<Square color={colors.svg.square} />
			</View>
			<View className="absolute bottom-72 -right-28 -z-10">
				<Circles color={colors.svg.circles} />
			</View>
			<View className="absolute bottom-0 -right-20 -z-10">
				<BottomLine color={colors.svg.bottomLine} />
			</View>
		</ScreenWrapper>
	)
}

export default AboutApp
