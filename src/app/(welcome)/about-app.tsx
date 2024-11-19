import {
  AboutSvg,
  BottomLine,
  Circles,
  Lines,
  UpperLine,
} from "@/components/icons"
import ScreenWrapper from "@/components/ScreenWrapper"
import RotatedSquares from "@/components/svgs/RotatedSquares"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import useColors from "@/hooks/useColors"
import { router } from "expo-router"
import { useTranslation } from "react-i18next"
import { Square } from "lucide-react-native"
import React from "react"

import { Text, View } from "react-native"

const AboutApp = () => {
  const colors = useColors()
  const { t } = useTranslation()

  return (
    <ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
      <View className="flex flex-col justify-center items-center w-full gap-20">
        <View className="flex justify-start items-center">
          <ProgressIndicator progress={2} />
        </View>
        <View className="flex justify-center items-center w-full flex-col h-fit p-2 gap-8">
          <View>
            <AboutSvg />
          </View>
          <View className="flex justify-center items-center w-full flex-col p-2 gap-1">
            <Text className="font-psemibold text-5xl text-foreground text-center py-2">
              Elektronik
            </Text>
            <Text className="font-pregular text-base text-foreground text-center px-5">
              {t("Welcome.secondPage")}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex justify-center w-full items-center flex-col">
        <Button
          text={t("Button.continue")}
          onPress={() => router.navigate("/set-up")}
        />
      </View>

      <View className="absolute bottom-64 -right-32 -z-10"></View>
      <View className="absolute top-64 -left-36 -z-10">
        <Lines color={colors.svg.lines} />
      </View>
      <View className="absolute top-24 right-28 -z-10">
        <RotatedSquares color={colors.svg.smallSquares} />
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
