import { View, Text, TouchableOpacity } from "react-native"
import TabBarIcon from "./TabBarIcon"

export default function TabBar({ state, descriptors, navigation }: any) {
	// any: react-native-navigation does not export types for TabBar props.
	return (
		<View className="flex-row justify-around pb-4 bg-background">
			{(state.routes as any[]).map((route, index) => {
				const { options } = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params)
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					})
				}
				if (route.name === "radio") {
					return null
				}
				return (
					<TabBarIcon
						key={route.key}
						focused={isFocused}
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						Icon={options.tabBarIcon}
					/>
				)
			})}
		</View>
	)
}
