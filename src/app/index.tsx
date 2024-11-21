import ScreenWrapper from "@/components/ScreenWrapper"
import useColors from "@/hooks/useColors"
import { getStorageData, StorageKeys } from "@/lib/storage"
import { router } from "expo-router"
import { LoaderCircle } from "lucide-react-native"
import { useLayoutEffect } from "react"
import { View } from "react-native"

export default function Index() {
  const colors = useColors()

  useLayoutEffect(() => {
    const check = async () => {
      const res = await getStorageData(StorageKeys.firstTimeUser)

      if (res.success) {
        res.data ? router.navigate("/welcome") : router.navigate("/(tabs)")
        return
      }
      router.navigate("/welcome")
    }

    check()
  }, [])

  return (
    <ScreenWrapper className="flex justify-center items-center">
      <View key={"loader"} className="animate-spin">
        <LoaderCircle size={64} color={colors.primary} />
      </View>
    </ScreenWrapper>
  )
}
