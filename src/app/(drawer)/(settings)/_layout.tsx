import { router, Stack } from "expo-router"
import { useEffect } from "react"
import { BackHandler, View } from "react-native"

export default function Layout() {
  useEffect(() => {
    const backAction = () => {
      router.navigate("/(drawer)/(tabs)/home")
      return true
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  return (
    <View className="flex-1 bg-background">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="language"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="theme"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  )
}
