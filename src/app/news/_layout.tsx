import { Stack } from "expo-router"
import { View } from "react-native"

export default function StackLayout() {
  return (
    <View className="bg-background flex-1">
      <Stack screenOptions={{ animation: "fade" }}>
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
