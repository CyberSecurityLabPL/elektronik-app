import { View, Text, TouchableOpacity, ImageBackground } from "react-native"
import React from "react"
import { Clock } from "lucide-react-native"

interface EventProps {
	type: "future event" | "event"
	title: string
	content: string
	date: string
	timeLeft: string
}

const Event: React.FC<EventProps> = ({
	type,
	title,
	content,
	date,
	timeLeft,
}) => {
	if (type === "event") {
		return (
			<TouchableOpacity
				className="rounded-3xl overflow-hidden"
				activeOpacity={0.85}
			>
				<ImageBackground
					source={require("../../assets/images/event-card-background.png")}
					className="w-[85vw]"
				>
					<View className=" flex w-[85vw] rounded-3xl pt-9 pb-6 px-6 color-[#222222]">
						<View className="flex-row justify-between pb-6">
							<View>
								<Text className="text-base font-medium">{title}</Text>
							</View>
							<View className="flex-row items-center justify-center gap-2 py-1 px-3 rounded-xl bg-[#FFEEDA]">
								<Clock size={16} color={"#212121"} strokeWidth={3} />
								<Text className="text-xl font-psemibold">{timeLeft}</Text>
							</View>
						</View>
						<View>
							<Text className="text-6xl font-psemibold leading-tight">
								{content}
							</Text>
						</View>
						<View className="flex-row justify-end pt-7">
							<View className="flex-row items-center justify-center gap-2">
								<Text className="text-lg font-pregular">{date}</Text>
								<Clock size={16} color={"#212121"} strokeWidth={3} />
							</View>
						</View>
					</View>
				</ImageBackground>
			</TouchableOpacity>
		)
	} else {
		return (
			<TouchableOpacity
				className="rounded-3xl overflow-hidden"
				activeOpacity={0.85}
			>
				<ImageBackground
					source={require("../../assets/images/future-event-card-background.png")}
					className="w-[85vw]"
				>
					<View className=" flex justify-center items-center w-[85vw] rounded-3xl pt-11 pb-10 px-6 color-[#222222]">
						<View className="absolute top-3 left-7">
							<Text className="text-base font-medium">{title}</Text>
						</View>

						<View className="flex-row justify-center items-center">
							<View className="w-[66%]">
								<Text className="text-[2.5rem] font-psemibold leading-tight">
									{content}
								</Text>
							</View>
							<View className="w-[33%]">
								<Text className="text-xl font-pregular">{date}</Text>
							</View>
						</View>
					</View>
				</ImageBackground>
			</TouchableOpacity>
		)
	}
}

export default Event
