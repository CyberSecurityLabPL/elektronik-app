import {
  TAB_BAR_BOTTOM_MARGIN,
  TAB_BAR_CONTENT_HEIGHT,
} from "@/constants/layout"
import { BlurView } from "expo-blur"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useColorScheme } from "nativewind"
import TabBarIcon from "./TabBarIcon"
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs"

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  const { colorScheme } = useColorScheme()

  return (
    <View
      className="absolute left-4 right-4 items-center"
      style={{ bottom: insets.bottom + TAB_BAR_BOTTOM_MARGIN }}
      pointerEvents="box-none"
    >
      <View
        className="w-full rounded-full overflow-hidden border border-foreground/10 shadow-lg shadow-black/20"
        style={{ height: TAB_BAR_CONTENT_HEIGHT }}
      >
        <BlurView
          intensity={60}
          tint={colorScheme === "dark" ? "dark" : "light"}
          style={StyleSheet.absoluteFill}
          blurMethod="dimezisBlurView"
        >
          <View className="flex-1 flex-row justify-around items-center bg-background/40">
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

              return (
                <TabBarIcon
                  key={route.key}
                  focused={isFocused}
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={
                    options.tabBarAccessibilityLabel ?? "Tab bar icon"
                  }
                  testID={
                    options.tabBarButtonTestID ?? "tab-bar-icon-test-id-" + index
                  }
                  onPress={onPress}
                  onLongPress={onLongPress}
                  Icon={options.tabBarIcon as React.ForwardRefExoticComponent<any>}
                />
              )
            })}
          </View>
        </BlurView>
      </View>
    </View>
  )
}
