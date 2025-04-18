import useColors from "@/hooks/useColors"
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer"
import { DrawerActions } from "@react-navigation/native"
import { useRouter } from "expo-router"
import {
    AudioLines,
    Facebook,
    Globe,
    SettingsIcon,
    X,
} from "lucide-react-native"
import React from "react"
import { Linking, View } from "react-native"
import { DiscordLogo, LogoSvg } from "../icons"
import IconButton from "../ui/IconButton"
import LargeButton from "../ui/LargeButton"
import { useTranslation } from "react-i18next"
import { WideLuckyNumber } from "../LuckyNumber"
import { useTheme } from "../Providers/ThemeProvider"

const Sidebar = (props: DrawerContentComponentProps) => {
    const colors = useColors()
    const router = useRouter()
    const { t } = useTranslation()
    const { theme } = useTheme()

    const closeDrawer = () => {
        props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    return (
        <View className=" pt-16 px-4 pb-6 flex-1 flex-col flex justify-between border-0 bg-background">
            <View className="flex flex-row justify-between items-center w-full py-8">
                <View className="flex flex-row gap-4 justify-between items-center w-full pl-5">
                    <View className="mt-2">
                        <LogoSvg width="64px" height="64px" variant={theme === 'light' ? 'light' : 'dark'} />
                    </View>
                    {/* <Text className="text-3xl text-foreground font-pmedium mt-2">
                        Elektronik
                    </Text> */}
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
                <WideLuckyNumber />
                <LargeButton
                    LucideIcon={AudioLines}
                    iconColor={colors.foreground}
                    text={t("Sidebar.radio")}
                    onPress={() => router.navigate("/(tabs)/radio")}
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
                    text={t("Sidebar.settings")}
                    onPress={() => router.navigate("/settings")}
                />
            </View>
        </View>
    )
}

export default Sidebar
