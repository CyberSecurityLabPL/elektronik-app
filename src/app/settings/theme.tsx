import { Alert, Linking, Platform, Pressable, Text, View } from "react-native"
import React, { useCallback } from "react"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import { Trans, useTranslation } from "react-i18next"
import LargeButton from "@/components/ui/LargeButton"
import { Info, Moon, Sun } from "lucide-react-native"
import useColors from "@/hooks/useColors"
import { useTheme } from "@/components/Providers/ThemeProvider"
import { toast } from "sonner-native"

const Theme = () => {
    const { t } = useTranslation()
    const colors = useColors()
    const { theme, setTheme } = useTheme()

    const openDeviceSettings = useCallback(async () => {
        if (Platform.OS === 'ios') {
            Linking.openSettings();
        } else {
            try {
                await Linking.sendIntent('android.settings.DISPLAY_SETTINGS')
            } catch (err: any) {
                console.error('Error opening Android settings:', err)
                Alert.alert(err.message)
            }
        }
    }, [])

    return (
        <ScreenWrapper>
            <Heading title={t('Settings.theme.heading')} screen="settings" />
            <View className="flex flex-col justify-between h-full pb-40">
                <View className="gap-y-2">
                    <LargeButton
                        text={t('Settings.theme.light')}
                        LucideIcon={Sun}
                        iconColor={colors.foreground}
                        selected={theme === 'light'}
                        onPress={() => {
                            setTheme('light')
                            toast(t("Settings.theme.infoLight"))
                        }}
                        disabled={theme === 'light'}
                    />
                    <LargeButton
                        text={t('Settings.theme.dark')}
                        LucideIcon={Moon}
                        iconColor={colors.foreground}
                        selected={theme === 'dark'}
                        onPress={() => {
                            setTheme('dark')
                            toast(t("Settings.theme.infoDark"))
                        }}
                        disabled={theme === 'dark'}
                    />
                </View>
                { theme === 'light' && (
                    <Pressable
                        onPress={openDeviceSettings}
                    >
                        <View className="flex w-full flex-row justify-center gap-x-2">
                            <View className="mt-2">
                                <Info color={colors.foregroundSecondary} size={16} />
                            </View>
                            <Text className="text-center py-2 text-sm text-foreground-secondary">
                                <Trans
                                    i18nKey={'Settings.theme.lightDisclaimer'}
                                    components={{
                                        italic: <Text className="italic" />,
                                        redirect: <Text className="text-primary" />
                                    }}
                                />
                            </Text>
                        </View>
                    </Pressable>
                )}
            </View>
        </ScreenWrapper>
    )
}

export default Theme
