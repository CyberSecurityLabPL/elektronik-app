import { getStorageData, StorageKeys } from "@/lib/storage"
import { Redirect, router } from "expo-router"
import { useEffect, useLayoutEffect, useState } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  useLayoutEffect(() => {
    const check = async () => {
      const res = await getStorageData(StorageKeys.firstTimeUser)

      if (res.success) {
        res.data ? router.navigate("/welcome") : router.navigate("/(tabs)")
      }
    }

    check()
  }, [])

  return (
    <View className="flex-1 bg-background">
      <Redirect href="/welcome/" />
    </View>
  )
}
