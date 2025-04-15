import { Stack } from "expo-router"
import React from "react"
import { View } from "react-native"

const WelcomeLayout = () => {
  return (
    <View className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="about-app" />
        <Stack.Screen name="set-up" />
        <Stack.Screen name="notifications" />
      </Stack>
    </View>
  )
}

export default WelcomeLayout
