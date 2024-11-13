import { View, Text } from "react-native"
import React from "react"
import IconButton from "./IconButton"
import { AlignRight, ChevronLeft } from "lucide-react-native"
import { router, useNavigation } from "expo-router"
import { cn } from "@/lib/utils"
import { DrawerActions } from "@react-navigation/native"

interface headingProps {
  title: string
  homeScreen?: boolean
  settingsScreen?: boolean
}
const Heading = ({ title, homeScreen, settingsScreen }: headingProps) => {
  const navigation = useNavigation()
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <View
      className={cn(settingsScreen ? "gap-7" : "", "w-full flex flex-col pt-6")}
    >
      <View
        className={cn(
          settingsScreen ? "justify-start" : "justify-end",
          "flex flex-row ",
        )}
      >
        <IconButton
          LucideIcon={settingsScreen ? ChevronLeft : AlignRight}
          iconColor="white"
          onPress={settingsScreen ? () => router.back() : openDrawer}
        />
      </View>

      <View className="flex flex-col gap-1 ">
        <Text
          className={cn(
            homeScreen ? "flex" : "hidden",
            "text-foreground-secondary text-base ",
          )}
        >
          Dzień dobry,
        </Text>

        <Text className="text-foreground font-psemibold text-2xl">{title}</Text>
      </View>
    </View>
  )
}

export default Heading
