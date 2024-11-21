import { router, Stack } from "expo-router"
import { useEffect } from "react"
import { BackHandler, View } from "react-native"

export default function Layout() {
  useEffect(() => {
    const backAction = () => {
      router.back()
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
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="language" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="theme" />
      </Stack>
    </View>
  )
}
