import WelcomeSvg from "@/components/icons/WelcomeSvg"
import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import useColors from "@/hooks/useColors"
import { getAllStorageData } from "@/lib/storage"
import { checkFirstTimeUser } from "@/lib/utils"
import { router } from "expo-router"
import { LoaderCircle } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { Circles, Flower, Lines } from "@/components/icons"

const Page = () => {
  const colors = useColors()
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    getAllStorageData().then((res) => {
      if (res.success) {
        console.log(res.data)
      }
    })

    checkFirstTimeUser().then((shouldRedirect) => {
      if (shouldRedirect) {
        router.push("/home")
      }
      setLoading(false)
    })
  }, [])

  if (loading)
    return (
      <ScreenWrapper className="flex justify-center items-center">
        <View key={"loader"} className="animate-spin">
          <LoaderCircle size={64} color={colors.primary} />
        </View>
      </ScreenWrapper>
    )
  else
    return (
      <ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
        <View className="flex flex-col justify-center items-center w-full gap-64">
          <View className="flex justify-start items-center">
            <ProgressIndicator progress={1} />
          </View>
          <View className="absolute top-2 -right-44 -z-10">
            <Flower color={colors.svg.topFlower} />
          </View>
          <View className="flex justify-center items-center w-full flex-col h-fit p-2 gap-8">
            <View>
              <WelcomeSvg />
            </View>
            <View className="flex justify-center items-center w-full flex-col p-2 gap-1">
              <Text className="font-psemibold text-5xl text-foreground text-center p-2">
                Elektronik
              </Text>
              <Text className="font-pregular text-base text-foreground text-center px-5">
                {t("Welcome.firstPage")}
              </Text>
            </View>
          </View>
        </View>
        <Button
          text={t("Button.continue")}
          onPress={() => router.navigate("/about-app")}
        />

        <View className="absolute top-32 -left-14 -z-10">
          <Circles color={colors.svg.circles} />
        </View>
        <View className="absolute bottom-64 -right-32 -z-10">
          <Lines color={colors.svg.lines} />
        </View>
        <View className="absolute bottom-0 -left-36 -z-10">
          <Flower color={colors.svg.bottomFlower} />
        </View>
        <View className="absolute top-0 right-0 -z-10"></View>
      </ScreenWrapper>
    )
}

export default Page
