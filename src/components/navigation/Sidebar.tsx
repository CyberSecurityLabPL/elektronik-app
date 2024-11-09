import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import { X } from "lucide-react-native"
import React from "react"
import { Text, View } from "react-native"
import IconButton from "../ui/IconButton"

const Sidebar = (props: any) => {
	const navigation = useNavigation()
	const openDrawer = () => {
		navigation.dispatch(DrawerActions.openDrawer())
	}
	return (
		<View className="p-4 pt-16 flex-1 bg-background">
			<View className="flex flex-row justify-between items-center">
				{/* TODO: add logo */}

				<Text className="text-4xl text-foreground">Elektronik</Text>
				<IconButton LucideIcon={X} iconColor="#B6B6D9" onPress={openDrawer} />
			</View>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			{/* TODO: add settings in the bottom and social links */}
		</View>
	)
}

export default Sidebar
