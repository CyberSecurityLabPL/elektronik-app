import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import LargeButton from "@/components/ui/LargeButton"
import { router } from "expo-router"
import React from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

const Language = () => {
  const { i18n, t } = useTranslation()

  console.log(i18n.language)

  const languages = [
    {
      code: "pl",
      nativeName: "Polski",
      localName: t("Settings.languages.polish"),
    },
    {
      code: "en",
      nativeName: "English",
      localName: t("Settings.languages.english"),
    },
    {
      code: "uk",
      nativeName: "Українська",
      localName: t("Settings.languages.ukrainian"),
    },
    {
      code: "zh",
      nativeName: "中文",
      localName: t("Settings.languages.chinese"),
    },
  ]

  const handleChange = (language: "pl" | "en" | "uk" | "zh") => {
    i18n.changeLanguage(language)
    router.back()
  }

  const currentLanguage = languages.find((lang) => lang.code === i18n.language)

  return (
    <ScreenWrapper>
      <Heading title={t("Settings.heading")} screen="settings" />
      <LargeButton text={currentLanguage?.localName as string} selected />

      <View className="w-full h-[1px] bg-foreground-secondary my-6 px-12" />

      <View className="flex gap-2">
        {languages
          .filter((lang) => lang.code !== i18n.language)
          .map((lang) => (
            <LargeButton
              key={lang.code}
              text={lang.localName}
              onPress={() =>
                handleChange(lang.code as "pl" | "en" | "uk" | "zh")
              }
            />
          ))}
      </View>
    </ScreenWrapper>
  )
}

export default Language
