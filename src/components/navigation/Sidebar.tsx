import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer"
import { DrawerActions } from "@react-navigation/native"
import { Link, useNavigation, useRouter } from "expo-router"
import { Facebook, Globe, Instagram, X } from "lucide-react-native"
import React from "react"
import { Text, View } from "react-native"
import IconButton from "../ui/IconButton"
import { Linking } from "react-native"

const Sidebar = (props: DrawerContentComponentProps) => {
	const router = useRouter()
	const navigation = useNavigation()
	const closeDrawer = () => {
		navigation.dispatch(DrawerActions.closeDrawer())
	}

	return (
		<View className=" pt-16 px-4 pb-6  flex-1 flex-col flex justify-between border-0  bg-background">
			<View className="flex flex-row justify-between items-center w-full">
				<View className="flex flex-row gap-4 justify-between items-center w-full">
					<View className="flex flex-row items-center gap-2">
						{/* TODO: add logo */}
						<View className="w-16 h-16 bg-white rounded-xl" />
						<Text className="text-3xl text-foreground">Elektronik</Text>
					</View>

					<IconButton
						LucideIcon={X}
						iconColor="#B6B6D9"
						onPress={closeDrawer}
					/>
				</View>
			</View>

			<DrawerContentScrollView {...props}>
				{/* change  to button component */}
				<DrawerItemList {...props} />
				<DrawerItem
					label={"Radio Elektron"}
					onPress={() => router.push("/(drawer)/(tabs)/radio")}
				/>
			</DrawerContentScrollView>
			<View className=" p-4 flex flex-col ">
				<View className="border-b border-zinc-600 flex w-full justify-around flex-row pb-4 ">
					<IconButton
						LucideIcon={Facebook}
						iconColor="#7293FF"
						onPress={() =>
							Linking.openURL("https://www.facebook.com/zgelektronik")
						}
					/>
					<IconButton
						LucideIcon={Globe}
						iconColor="#7293FF"
						onPress={() => Linking.openURL("https://zseis.zgora.pl/")}
					/>
					{/* change to discord Icon */}
					<IconButton
						LucideIcon={Instagram}
						iconColor="#7293FF"
						onPress={() => Linking.openURL("https://discord.gg/jrDxST")}
					/>
				</View>
				{/* change  to button component */}
				<Link href={"/(drawer)/(settings)/settings"} className=" py-4">
					<Text className="text-primary">Settings</Text>
				</Link>
			</View>
		</View>
	)
}

export default Sidebar
