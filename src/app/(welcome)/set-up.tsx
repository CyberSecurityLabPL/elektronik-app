import ScreenWrapper from "@/components/ScreenWrapper"
import { saveFirstTime } from "@/lib/utils"
import { Link } from "expo-router"
import { Text, Pressable } from "react-native"

const SetUp = () => {
	return (
		<ScreenWrapper>
			<Text>Set up</Text>
			<Link onPress={saveFirstTime} href={"/home"} asChild>
				<Pressable>
					<Text>Next</Text>
				</Pressable>
			</Link>
		</ScreenWrapper>
	)
}

export default SetUp
