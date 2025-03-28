import { View } from "react-native"
import React from "react"

const ProgressIndicator = ({ progress }: { progress: 1 | 2 | 3 | 4 }) => {
  return (
    <View className="flex flex-row justify-center items-center gap-2">
      <View className={`rounded-md h-2 w-20 bg-primary`}></View>
      <View
        className={`rounded-md h-2 w-20 ${
          progress > 1 ? "bg-primary" : "bg-background-secondary"
        }`}
      ></View>
      <View
        className={`rounded-md h-2 w-20 ${
          progress > 2 ? "bg-primary" : "bg-background-secondary"
        }`}
      ></View>
      <View
        className={`rounded-md h-2 w-20 ${
          progress > 3 ? "bg-primary" : "bg-background-secondary"
        }`}
      ></View>
    </View>
  )
}

export default ProgressIndicator
