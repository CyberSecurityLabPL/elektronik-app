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
    <ScreenWrapper className="flex justify-between flex-col h-full w-full">
      <View className="absolute top-2 -right-44 -z-10">
        <Flower color={colors.svg.topFlower} />
      </View>
      <View className="gap-y-10">
        <ProgressIndicator progress={1} />
        <View className="flex justify-center items-center mt-20">
          <WelcomeSvg viewBox="0 0 246 199" width={200} height={200} />
        </View>
        <View>
          <Text className="font-psemibold text-5xl text-foreground text-center w-full pt-4">Elektronik</Text>
          <Text className="font-pregular text-base text-foreground text-center">{t("Welcome.firstPage")}</Text>
        </View>
      </View>

      <Button
        className="mb-4"
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
