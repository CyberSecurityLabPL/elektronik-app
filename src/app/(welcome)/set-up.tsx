import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import { saveFirstTime } from "@/lib/utils"
import { router } from "expo-router"
import { Text, View } from "react-native"
import { LogoSvg } from "@/components/svgs/LogoSvg"

const SetUp = () => {
	return (
		<ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
			<View className="flex flex-col justify-center items-center w-full gap-12">
				<View className="flex justify-start items-center">
					<ProgressIndicator progress={3} />
				</View>
				<View className="flex justify-center items-center w-full flex-col h-fit p-2 gap-8">
					<View className="flex flex-row justify-center items-center w-full gap-3 relative">
						<LogoSvg />
						<Text className="font-psemibold text-4xl text-foreground text-center py-2 flex justify-center items-center relative top-1">
							Elektronik
						</Text>
					</View>
					<View>
						<Text>Reszta inputow</Text>
					</View>
				</View>
			</View>
			<View className="flex justify-center w-full items-center flex-col">
				<Button text="Kontynuuj" onPress={goToHome} />
			</View>
		</ScreenWrapper>
	)
}

const goToHome = async () => {
	router.push("/home")
	await saveFirstTime()
}

export default SetUp
