import ScreenWrapper from "@/components/ScreenWrapper"
import { clearStorage } from "@/lib/storage"
import { Pressable, Text } from "react-native"

const Home = () => {
	return (
		<ScreenWrapper>
			<Text>Home</Text>
			<Pressable
				onPress={() => {
					clearStorage()
					console.log("storage clear")
				}}
			>
				<Text>Clear Async Storage</Text>
			</Pressable>
		</ScreenWrapper>
	)
}

export default Home
