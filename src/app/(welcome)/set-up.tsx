import ScreenWrapper from "@/components/ScreenWrapper"
import useColors from "@/hooks/useColors"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import { saveFirstTime, saveUserData } from "@/lib/utils"
import { router } from "expo-router"
import { Text, View } from "react-native"
import { LogoSvg } from "@/components/svgs/LogoSvg"
import Input from "@/components/ui/Input"
import { Select, SelectItem } from "@/components/ui/Select"
import { useState } from "react"
import Lines from "@/components/svgs/Lines"
import Multiplication from "@/components/svgs/Multiplication"
import Circles from "@/components/svgs/Circles"
import SmallCircles from "@/components/svgs/SmallCircles"

const SetUp = () => {
	const colors = useColors()
	const [selectedGrade, setSelectedGrade] = useState<string>()
	const [diaryNumber, setDiaryNumber] = useState(0)
	const [name, setName] = useState("")
	const [correctFields, setCorrectFields] = useState([true, true, true])

	const goToHomeAsGuest = async () => {
		router.push("/home")
		await saveFirstTime()
	}

	const goToHome = async () => {
		const nameFilled = name !== null && name !== ""
		const gradeFilled = selectedGrade !== null && selectedGrade !== undefined
		const numberFilled =
			diaryNumber !== null && diaryNumber > 0 && diaryNumber < 50

		if (!nameFilled || !gradeFilled || !numberFilled) {
			setCorrectFields([nameFilled, gradeFilled, numberFilled])

			return
		}

		await goToHomeAsGuest()
		await saveUserData({
			name,
			diaryNumber,
			grade: selectedGrade,
		})
	}

	return (
		<ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
			<View className="flex flex-col justify-center items-center w-full gap-12">
				<View className="flex justify-start items-center">
					<ProgressIndicator progress={3} />
				</View>
				<View className="absolute top-4 -right-40 -z-10">
					<Multiplication color={colors.svg.multiplication} />
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
							<Text
								className={`${
									correctFields[0] ? "text-foreground" : "text-red-500"
								} font-pmedium text-xl p-2`}
							>
								Podaj Imię
							</Text>
							<Input
								onChangeText={(text) => setName(text)}
								type="text"
								placeholder="Michał"
							/>
						</View>
						<View className="w-full h-fit">
							<Text
								className={`${
									correctFields[1] ? "text-foreground" : "text-red-500"
								} font-pmedium text-xl p-2`}
							>
								Podaj Klasę
							</Text>
							<Select
								selectedValue={selectedGrade}
								onValueChange={(itemValue: any) => setSelectedGrade(itemValue)}
							>
								<SelectItem label="1ta Technik Programista" value="1ta" />
								<SelectItem label="1tb Technik Programista" value="1tb" />
							</Select>
						</View>
						<View className="flex justify-center items-center flex-col w-full">
							<Text
								className={`${
									correctFields[2] ? "text-foreground" : "text-red-500"
								} font-pmedium text-xl p-2 self-start`}
							>
								Wybierz numer z dziennika
							</Text>
							<Input
								onChangeText={(text) => setDiaryNumber(Number(text))}
								type="number"
								placeholder="0"
							/>
						</View>
					</View>
				</View>
			</View>
			<View className="flex justify-center w-full items-center flex-col gap-1">
				<Button
					variant="ghost"
					text="Kontynuuj jako gość"
					onPress={goToHomeAsGuest}
				/>
				<Button text="Kontynuuj" onPress={goToHome} />
			</View>

			<View className="absolute bottom-96 -left-8 -z-10">
				<Lines color={colors.svg.lines} />
			</View>
			<View className="absolute bottom-72 -right-24 -z-10">
				<Circles color={colors.svg.circles} />
			</View>
			<View className="absolute bottom-2 -left-16 -z-10">
				<SmallCircles color={colors.svg.smallCircles} />
			</View>
			<View className="absolute top-0 right-0 -z-10"></View>
		</ScreenWrapper>
	)
}

export default SetUp
