import useColors from "@/hooks/useColors"
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer"
import { DrawerActions } from "@react-navigation/native"
import { useRouter } from "expo-router"
import {
  Clover,
  Disc3,
  Facebook,
  Globe,
  SettingsIcon,
  X,
} from "lucide-react-native"
import React from "react"
import { Linking, Text, View } from "react-native"
import { toast } from "sonner-native"
import DiscordLogo from "../svgs/DiscordLogo"
import { LogoSvg } from "../svgs/LogoSvg"
import IconButton from "../ui/IconButton"
import LargeButton from "../ui/LargeButton"
const Sidebar = (props: DrawerContentComponentProps) => {
  const colors = useColors()
  const router = useRouter()
  const closeDrawer = () => {
    props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  const status = useDrawerStatus()

  console.log("status: ", status)

  return (
    <View className=" pt-16 px-4 pb-6 flex-1 flex-col flex justify-between border-0 bg-background">
      <View className="flex flex-row justify-between items-center w-full py-8">
        <View className="flex flex-row gap-4 justify-between items-center w-full">
          <View className="flex flex-row items-center gap-1">
            <LogoSvg width="70px" height="70px" />
            <Text className="text-3xl text-foreground font-pmedium">
              Elektronik
            </Text>
          </View>

          <IconButton
            LucideIcon={X}
            iconColor={colors.foreground}
            onPress={closeDrawer}
          />
        </View>
      </View>

      <DrawerContentScrollView
        contentContainerClassName="flex flex-col gap-4"
        {...props}
      >
        <LargeButton
          LucideIcon={Disc3}
          iconColor={colors.foreground}
          text="Radio Elektron"
          onPress={() => router.push("/(drawer)/(tabs)/radio")}
        />
        <LargeButton
          LucideIcon={Clover}
          iconColor={colors.foreground}
          text="Szczęsliwy Numerek"
          onPress={() => toast("Dostępne wkrótce!")}
        />
      </DrawerContentScrollView>
      <View className="flex flex-col gap-4">
        <View className="flex w-full justify-center gap-4 flex-row">
          <IconButton
            LucideIcon={Facebook}
            iconColor={colors.primary}
            onPress={() =>
              Linking.openURL("https://www.facebook.com/zgelektronik")
            }
          />
          <IconButton
            LucideIcon={Globe}
            iconColor={colors.primary}
            onPress={() => Linking.openURL("https://zseis.zgora.pl/")}
          />
          <IconButton
            LucideIcon={DiscordLogo}
            iconColor={colors.primary}
            onPress={() => Linking.openURL("https://discord.gg/jrDxST")}
          />
        </View>
        <View className="w-full h-[1px] bg-foreground-secondary"></View>
        <LargeButton
          LucideIcon={SettingsIcon}
          iconColor={colors.foreground}
          text="Ustawienia"
          onPress={() => router.push("/(drawer)/(settings)/settings")}
        />
      </View>
    </View>
  )
}

export default Sidebar
