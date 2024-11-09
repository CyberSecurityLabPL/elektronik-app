import ScreenWrapper from "@/components/ScreenWrapper"
import { Link } from "expo-router"
import { Text } from "react-native"

const Settings = () => {
	return (
		<ScreenWrapper>
			<Text>Settings page</Text>
			{/* @ts-expect-error */}
			<Link href="(drawer)/(tabs)/home" asChild>
				<Text className="text-white">Go back</Text>
			</Link>
		</ScreenWrapper>
	)
}

export default Settings
