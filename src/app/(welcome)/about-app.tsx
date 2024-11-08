import { Text, Pressable } from "react-native"
import React from "react"
import { Link } from "expo-router"
import ScreenWrapper from "@/components/ScreenWrapper"

const AboutApp = () => {
	return (
		<ScreenWrapper>
			<Text>About App</Text>
			<Link href={"/set-up"} asChild>
				<Pressable>
					<Text>Next</Text>
				</Pressable>
			</Link>
		</ScreenWrapper>
	)
}

export default AboutApp
