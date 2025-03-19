import {
  AboutSvg,
  BottomLine,
  Circles,
  WelcomeSvg,
  Flower,
  Lines,
  RotatedSquares,
  Square,
  UpperLine,
} from "@/components/icons"
import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import useColors from "@/hooks/useColors"
import { router } from "expo-router"
import React from "react"
import { useTranslation } from "react-i18next"

import { Text, View } from "react-native"

const AboutApp = () => {
  const colors = useColors()
  const { t } = useTranslation()

  return (
    <ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
      <View className="absolute top-2 -right-44 -z-10">
        <Flower color={colors.svg.topFlower} />
      </View>
      <View className="gap-y-10">
        <ProgressIndicator progress={2} />
        <View className="flex justify-center items-center mt-32 w-fit h-fit">
          <AboutSvg viewBox="0 0 314 342" width={200} height={200}/>
        </View>
        <View>
          <Text className="font-pregular text-base text-foreground text-center">{t("Welcome.secondPage")}</Text>
        </View>
      </View>


      <View className="flex justify-center w-full items-center flex-col">
        <Button
          className="mb-4"
          text={t("Button.continue")}
          onPress={() => router.navigate("/welcome/set-up")}
        />
      </View>

      <View className="absolute bottom-64 -right-32 -z-10"></View>
      <View className="absolute top-64 -left-36 -z-10">
        <Lines color={colors.svg.lines} />
      </View>
      <View className="absolute top-24 right-28 -z-10">
        <RotatedSquares color={colors.svg.smallRotatedSquares} />
      </View>
      <View className="absolute top-6 -left-28 -z-10">
        <UpperLine color={colors.svg.upperLine} />
      </View>
      <View className="absolute top-56 -right-44 -z-10">
        <Square color={colors.svg.square} />
      </View>
      <View className="absolute bottom-72 -right-28 -z-10">
        <Circles color={colors.svg.circles} />
      </View>
      <View className="absolute bottom-0 -right-20 -z-10">
        <BottomLine color={colors.svg.bottomLine} />
      </View>
    </ScreenWrapper>
  )
}

export default AboutApp
