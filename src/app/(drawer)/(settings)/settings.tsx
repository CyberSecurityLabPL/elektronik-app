import { useTheme } from "@/components/Providers/ThemeProvider"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import LargeButton from "@/components/ui/LargeButton"
import Modal from "@/components/ui/Modal"

import useColors from "@/hooks/useColors"
import useLanguage from "@/hooks/useLanguage"
import {
  clearStorage,
  getStorageData,
  setStorageData,
  StorageKeys,
} from "@/lib/storage"
import { Bell, Languages, Sun, User2, X } from "lucide-react-native"
import { useColorScheme } from "nativewind"
import { useLayoutEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { toast } from "sonner-native"

const Settings = () => {
  const colors = useColors()
  const [themeModalOpen, setThemeModalOpen] = useState(false)

  const { colorScheme, setColorScheme } = useColorScheme()
  const { i18n, t } = useTranslation()
  const languages = useLanguage()

  const currentLanguage = languages.find((lang) => lang.code === i18n.language)

  const handleThemeChange = async (theme: string) => {
    const result = await setStorageData(StorageKeys.theme, theme)

    if (result.success) {
      console.log("Theme changed: ", result.data)
      if (theme == "light") {
        setColorScheme("light")
        toast(t("Settings.theme.infoLight"))
      } else {
        setColorScheme("dark")
        toast(t("Settings.theme.infoDark"))
      }
    } else {
      console.error("Failed to change theme:", result.error)
    }
  }
  return (
    <ScreenWrapper>
      <Heading title={t("Settings.heading")} screen="settings" />
      <View className="gap-2">
        <LargeButton
          text={t("Settings.listItem.profile")}
          extendable
          iconColor={colors.foreground}
          LucideIcon={User2}
          href={"/(drawer)/(settings)/profile"}
          strokeWidth={1.5}
        />
        <LargeButton
          text={t("Settings.listItem.notifications")}
          extendable
          iconColor={colors.foreground}
          LucideIcon={Bell}
          href={"/(drawer)/(settings)/notifications"}
          strokeWidth={1.5}
        />
        <LargeButton
          text={t("Settings.listItem.theme")}
          extendable
          iconColor={colors.foreground}
          LucideIcon={Sun}
          onPress={() => setThemeModalOpen(true)}
          strokeWidth={1.5}
          extraText={
            colorScheme === "dark"
              ? t("Settings.theme.dark")
              : t("Settings.theme.light")
          }
        />
        <LargeButton
          text={t("Settings.listItem.languages")}
          extendable
          iconColor={colors.foreground}
          LucideIcon={Languages}
          href={"/(drawer)/(settings)/language"}
          strokeWidth={1.5}
          extraText={currentLanguage?.localName}
        />
        <LargeButton
          text="Clear storage"
          onPress={async () => {
            await clearStorage()
            toast("Storage Cleared!")
          }}
        />
        <Modal
          id="bells"
          isOpen={themeModalOpen}
          onClose={() => setThemeModalOpen(false)}
        >
          <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background">
            <View className="p-4 w-full flex gap-2">
              <Text className="text-3xl text-foreground font-pmedium text-center p-6">
                {t("Settings.theme.heading")}
              </Text>
              <LargeButton
                text={t("Settings.theme.light")}
                onPress={() => handleThemeChange("light")}
                selected={colorScheme === "light"}
              />
              <LargeButton
                text={t("Settings.theme.dark")}
                onPress={() => handleThemeChange("dark")}
                selected={colorScheme === "dark"}
              />
            </View>
            <IconButton
              LucideIcon={X}
              iconColor={colors.foreground}
              onPress={() => setThemeModalOpen(false)}
              className="my-4"
            />
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  )
}

export default Settings
