import ScreenWrapper from "@/components/ScreenWrapper"
import { clearStorage } from "@/lib/storage"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import { Pressable, Text } from "react-native"

const Home = () => {
	const navigation = useNavigation()
	const openDrawer = () => {
		navigation.dispatch(DrawerActions.openDrawer())
	}
	return (
		<ScreenWrapper>
			<Text>Home</Text>
			<Pressable onPress={openDrawer}>
				<Text>open menu</Text>
			</Pressable>
			<Pressable
				onPress={async () => {
					await clearStorage()
					console.log("cleared")
				}}
			>
				<Text>Clear async storage</Text>
			</Pressable>
		</ScreenWrapper>
	)
}

export default Home
