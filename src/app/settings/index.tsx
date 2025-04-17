import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import LargeButton from "@/components/ui/LargeButton"
import useColors from "@/hooks/useColors"
import { Bell, Languages, Sun, User2 } from "lucide-react-native"
import { useColorScheme } from "nativewind"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import useLanguage from "@/hooks/useLanguage"
import { VersionIndicator } from "@/components/VersionIndicator"

export const Settings = () => {
    const { i18n, t } = useTranslation()
    const colors = useColors()
    const { colorScheme } = useColorScheme()
    const languages = useLanguage()

    const currentLanguage = languages.find((lang) => lang.code === i18n.language)

    return (
        <ScreenWrapper>
            <Heading title={t("Settings.heading")} screen="settings" />
            <View className="gap-2">
                <LargeButton
                    text={t("Settings.listItem.profile")}
                    extendable
                    iconColor={colors.foreground}
                    LucideIcon={User2}
                    href={"/settings/profile"}
                    strokeWidth={1.5}
                />
                <LargeButton
                    text={t("Settings.listItem.notifications")}
                    extendable
                    iconColor={colors.foreground}
                    LucideIcon={Bell}
                    href={"/settings/notifications"}
                    strokeWidth={1.5}
                />
                <LargeButton
                    text={t("Settings.listItem.theme")}
                    extendable
                    iconColor={colors.foreground}
                    LucideIcon={Sun}
                    href={'/settings/theme'}
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
                    href={"/settings/language"}
                    strokeWidth={1.5}
                    extraText={currentLanguage?.localName}
                />
            </View>
            <VersionIndicator />
        </ScreenWrapper>
    )
}

export default Settings