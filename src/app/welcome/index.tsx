import { Circles, Flower, Lines, WelcomeSvg } from "@/components/icons"
import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import useColors from "@/hooks/useColors"
import { router } from "expo-router"
import React from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

const Page = () => {
  const colors = useColors()
  const { t } = useTranslation()

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
        onPress={() => router.navigate("/welcome/about-app")}
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
    </ScreenWrapper>
  )
}

export default Page
