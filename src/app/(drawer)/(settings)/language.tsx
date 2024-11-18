import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import LargeButton from "@/components/ui/LargeButton"
import { languages } from "@/config"
import { getStorageData, setStorageData, StorageKeys } from "@/lib/storage"
import { router } from "expo-router"
import React, { useLayoutEffect } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

type LanguageCode = "pl" | "en" | "uk" | "de" | "cz" | "zhCH"

const Language = () => {
  const { i18n, t } = useTranslation()

  console.log("Language options:", languages)

  useLayoutEffect(() => {
    const fetchLanguage = async () => {
      const result = await getStorageData(StorageKeys.language)

      if (result.success) {
        i18n.changeLanguage(result.data)
      } else {
        console.log("Language in async storage is empty")
      }
    }

    fetchLanguage()
  }, [])

  const handleChange = async (language: LanguageCode) => {
    const result = await setStorageData("language", language)

    if (result.success) {
    } else {
      // Handle error
      console.error("Failed to save settings:", result.error)
    }
    i18n.changeLanguage(language)
    router.back()
  }

  const currentLanguage = languages.find((lang) => lang.code === i18n.language)

  return (
    <ScreenWrapper>
      <Heading title={t("Settings.languages.heading")} screen="settings" />
      <LargeButton text={currentLanguage?.localName as string} selected />

      <View className="w-full h-[1px] bg-foreground-secondary my-6 px-12" />

      <View className="flex gap-2">
        {languages
          .filter((lang) => lang.code !== i18n.language)
          .map((lang) => (
            <LargeButton
              key={lang.code}
              text={lang.localName}
              onPress={() => handleChange(lang.code as LanguageCode)}
            />
          ))}
      </View>
    </ScreenWrapper>
  )
}

export default Language
