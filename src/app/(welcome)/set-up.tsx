import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import { saveFirstTime } from "@/lib/utils"
import { router } from "expo-router"
import { Text, View } from "react-native"
import { LogoSvg } from "@/components/svgs/LogoSvg"
import Input from "@/components/ui/Input"
import { Select, SelectItem } from "@/components/ui/Select"
import { useState } from "react"

const SetUp = () => {
	const [selectedLanguage, setSelectedLanguage] = useState()

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
					<View className="flex justify-center items-center w-full flex-col gap-6">
						<View className="flex justify-center items-start flex-col w-full">
							<Text className="text-foreground font-pmedium text-xl p-2">
								Podaj Imię
							</Text>
							<Input type="text" placeholder="Satoru" />
						</View>
						<View className="w-full h-fit">
							<Text className="text-foreground font-pmedium text-xl p-2">
								Podaj Imię
							</Text>
							<Select
								selectedValue={selectedLanguage}
								onValueChange={(itemValue: any) =>
									setSelectedLanguage(itemValue)
								}
							>
								<SelectItem label="Java" value="java" />
								<SelectItem label="JavaScript" value="js" />
							</Select>
						</View>
						<View className="flex justify-center items-center flex-col w-full">
							<Text className="text-foreground self-start font-pmedium text-xl p-2">
								Wybierz numer z dziennika
							</Text>
							<Input type="number" placeholder="13" />
						</View>
					</View>
				</View>
			</View>
			<View className="flex justify-center w-full items-center flex-col gap-1">
				<Button variant="ghost" text="Kontynuuj jako gość" onPress={goToHome} />
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
