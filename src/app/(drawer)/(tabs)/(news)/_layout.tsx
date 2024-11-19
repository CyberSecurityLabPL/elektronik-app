import { Stack } from "expo-router"
import { View } from "react-native"

export default function StackLayout() {
  return (
    <View className="bg-background flex-1">
      <Stack screenOptions={{ animation: "ios" }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: "",
          }}
        />
      </Stack>
    </View>
  )
}
