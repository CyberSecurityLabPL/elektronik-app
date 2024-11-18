import ScreenWrapper from "@/components/ScreenWrapper"
import { SafeAreaView, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

const Timetable = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#1E1E1E]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <Text className="text-white text-2xl font-bold">Plan Lekcji</Text>
        <View className="bg-blue-500 px-3 py-2 rounded-lg">
          <Text className="text-white">Śr. 30.11</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <View
            key={num}
            className="flex-row items-center px-4 py-3 border-b border-gray-700"
          >
            <Text className="text-blue-500 text-lg font-bold w-8">{num}</Text>
            <View className="flex-1 mx-4">
              <Text className="text-white text-base">
                {num <= 2
                  ? "Tworzenie i admins..."
                  : num <= 4
                  ? "Matematyka"
                  : "Polski"}
              </Text>
              <Text className="text-gray-500 text-sm">8:00-8:45</Text>
            </View>
            <Text className="text-gray-500 text-sm">MW 101</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View className="px-4 py-3 border-t border-gray-700">
        <Text className="text-white text-base font-bold">2Tf</Text>
        <Text className="text-gray-500 text-sm">Rozkład zajęć klasy</Text>
      </View>

      {/* Tab Bar */}
      <View className="h-14 flex-row justify-around items-center border-t border-gray-700">
        <View className="items-center">
          <View className="w-6 h-6 bg-gray-600 rounded-full mb-1" />
          <View className="w-4 h-1 bg-gray-600 rounded" />
        </View>
        <View className="items-center">
          <View className="w-6 h-6 bg-gray-600 rounded-full mb-1" />
          <View className="w-4 h-1 bg-gray-600 rounded" />
        </View>
        <View className="items-center">
          <View className="w-6 h-6 bg-gray-600 rounded-full mb-1" />
          <View className="w-4 h-1 bg-gray-600 rounded" />
        </View>
        <View className="items-center">
          <View className="w-6 h-6 bg-gray-600 rounded-full mb-1" />
          <View className="w-4 h-1 bg-gray-600 rounded" />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Timetable
