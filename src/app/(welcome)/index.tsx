import ScreenWrapper from "@/components/ScreenWrapper"
import useColors from "@/hooks/useColors"
import { isFirstTime } from "@/lib/utils"
import { Link, Redirect } from "expo-router"
import { LoaderCircle } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"

const page = () => {
	const colors = useColors()
	const [loading, setLoading] = useState(true)
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		isFirstTime().then((isFirstTime) => {
			setLoading(false)
			setRedirect(!isFirstTime)
		})
	}, [redirect, loading])

	if (loading)
		return (
			<ScreenWrapper className="flex justify-center items-center">
				<View className="animate-spin">
					<LoaderCircle size={64} color={colors.primary} />
				</View>
			</ScreenWrapper>
		)

	if (redirect) return <Redirect href={"/home"} />
	else
		return (
			<ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
				<Text>Welcome</Text>
				<Link href={"/about-app"} asChild>
					<Pressable>
						<Text>Next</Text>
					</Pressable>
				</Link>
			</ScreenWrapper>
		)
}

export default page
