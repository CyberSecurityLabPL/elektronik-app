import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import SwitchButton from "@/components/ui/SwitchButton"
import { getStorageData, StorageKeys, setStorageData } from "@/lib/storage"
import { NotificationsState } from "@/types/app-data"
import { NotificationsSchema } from "@/types/schemas"
import React, { useLayoutEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

const Notifications = () => {
  const [switches, setSwitches] = useState<NotificationsState | null>(null)
  const { t } = useTranslation()

  useLayoutEffect(() => {
    const fetchNotifications = async () => {
      const result = await getStorageData(StorageKeys.notifications)

      if (result.success) {
        setSwitches(result.data)
      } else {
        // Handle different error types
        switch (result.error.type) {
          case "NOT_FOUND":
            // Set defaults for first time users
            const defaults = {
              articles: true,
              announcements: true,
              substitutions: true,
            }
            setSwitches(defaults)
            await setStorageData("notifications", defaults)
            break

          case "VALIDATION_ERROR":
            console.error("Invalid data format:", result.error.error)
            // Reset to defaults or show error to user
            break

          case "STORAGE_ERROR":
            console.error("Storage error:", result.error.error)
            // Show error to user
            break
        }
      }
    }

    fetchNotifications()
  }, [])

  const handlePress = async (optionName: keyof NotificationsState) => {
    if (!switches) return

    const newState = {
      ...switches,
      [optionName]: !switches[optionName],
    }

    const result = await setStorageData("notifications", newState)

    if (result.success) {
      setSwitches(newState)
    } else {
      // Handle error
      console.error("Failed to save settings:", result.error)
      // Optionally revert the switch state
    }
  }

  // Show loading state or nothing while data is being fetched
  if (!switches) {
    return (
      <ScreenWrapper>
        <Heading title="Powiadomienia" screen="settings" />
        {/* Optionally add loading indicator here */}
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <Heading title={t("Settings.notifications.heading")} screen="settings" />
      <View className="gap-4">
        <SwitchButton
          title={t("Settings.notifications.nSchoolTitle")}
          onPress={() => handlePress("articles")}
          isEnabled={switches.articles}
          subtitle={t("Settings.notifications.nSchoolSub")}
        />
        <SwitchButton
          title={t("Settings.notifications.nCouncilTitle")}
          onPress={() => handlePress("announcements")}
          isEnabled={switches.announcements}
          subtitle={t("Settings.notifications.nCouncilSub")}
        />
        <SwitchButton
          title={t("Settings.notifications.nSubtitutionsTitle")}
          onPress={() => handlePress("substitutions")}
          isEnabled={switches.substitutions}
          subtitle={t("Settings.notifications.nSubtitutionsSub")}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Notifications
