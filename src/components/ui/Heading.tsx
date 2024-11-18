import { View, Text } from "react-native"
import React from "react"
import IconButton from "./IconButton"
import { AlignRight, ChevronLeft } from "lucide-react-native"
import { router, useNavigation } from "expo-router"
import { cn } from "@/lib/utils"
import { DrawerActions } from "@react-navigation/native"
import useColors from "@/hooks/useColors"
import { useDrawerStatus } from "@react-navigation/drawer"
import { useTranslation } from "react-i18next"

interface headingProps {
  title: string
  // homeScreen?: boolean
  // settingsScreen?: boolean
  screen?: "default" | "settings"
}
const Heading = ({ title, screen = "default" }: headingProps) => {
  const colors = useColors()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }

  const settingsScreen = screen === "settings"

  return (
    <View
      className={cn(
        settingsScreen ? "gap-7" : "",
        "w-full flex flex-col pt-6 mb-6",
      )}
    >
      <View
        className={cn(
          settingsScreen ? "justify-start" : "justify-end",
          "flex flex-row ",
        )}
      >
        <IconButton
          LucideIcon={settingsScreen ? ChevronLeft : AlignRight}
          iconColor={colors.foreground}
          onPress={settingsScreen ? () => router.back() : openDrawer}
        />
      </View>

      <View className="flex flex-col gap-1 ">
        <Text
          className={cn(
            !settingsScreen ? "flex" : "hidden",
            "text-foreground-secondary text-base ",
          )}
        >
          {t("Heading.greet")}
        </Text>

        <Text className="text-foreground font-psemibold text-2xl">{title}</Text>
      </View>
    </View>
  )
}

export default Heading
