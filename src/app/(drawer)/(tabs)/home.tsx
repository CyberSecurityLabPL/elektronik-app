import ScreenWrapper from "@/components/ScreenWrapper"
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
		</ScreenWrapper>
	)
}

export default Home
