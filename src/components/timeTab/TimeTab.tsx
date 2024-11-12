import { View, Text } from "react-native"
import React from "react"
import { TouchableOpacity } from "react-native"

interface TimeTabProps {
	type: "active" | "inactive"
	day: string
	date: string
}

const TimeTab: React.FC<TimeTabProps> = ({ type, day, date }) => {
	if (type === "active") {
		return (
			<TouchableOpacity className="flex justify-center items-center bg-primary gap-2 py-2 px-5 rounded-2xl">
				<Text className="text-3xl dark:text-white text-black">{day}</Text>
				<Text className="text-2xl dark:text-white text-black">{date}</Text>
			</TouchableOpacity>
		)
	} else {
		return (
			<TouchableOpacity className="flex justify-center items-center dark:bg-[#1D1D1D] bg-[#FBFBFB] gap-2 py-2 px-5 rounded-2xl">
				<Text className="text-2xl dark:text-white text-black">{day}</Text>
				<Text className="text-xl dark:text-white text-black">{date}</Text>
			</TouchableOpacity>
		)
	}
}

export default TimeTab
