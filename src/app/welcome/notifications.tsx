import { Circles, Flower, Lines } from "@/components/icons"
import ScreenWrapper from "@/components/ScreenWrapper"
import Button from "@/components/ui/Button"
import ProgressIndicator from "@/components/ui/ProgressIndicator"
import useColors from "@/hooks/useColors"
import { setStorageData, StorageKeys } from "@/lib/storage"
import { router } from "expo-router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { View, Text } from "react-native"
import { SwitchPanel } from "@/components/notifications/SwitchPanel"

const NotificationsWelcomePage = () => {
    const [isLoading, setIsLoading] = useState(false)

    const colors = useColors()
    const { t } = useTranslation()

    const endOnboarding = async () => {
        await setStorageData(StorageKeys.firstTimeUser, false)
        router.navigate("/(tabs)")
    }    

    return (
        <ScreenWrapper className="flex justify-between items-center flex-col h-full w-full">
            <View>
                <View className="flex justify-start items-center">
                    <ProgressIndicator progress={4} />
                </View>
                <View className="w-full text-left mt-8">
                    <Text className="text-foreground text-2xl font-pbold">Powiadomienia</Text>
                </View>
            </View>


            <SwitchPanel
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                withAdditionalStyles
            />

            <View className="flex justify-center w-full items-center flex-col">
                <Button
                    className="mb-4"
                    text={t("Button.continue")}
                    onPress={endOnboarding}
                    disabled={isLoading}
                />
            </View>

            <View className="absolute top-32 -left-14 -z-10">
                <Circles color={colors.svg.circles} />
            </View>
            <View className="absolute bottom-64 -right-32 -z-10">
                <Lines color={colors.svg.lines} />
            </View>
            <View className="absolute bottom-0 -left-36 -z-10">
                <Flower color={colors.svg.bottomFlower} />
            </View>
        </ScreenWrapper>
    )
}

export default NotificationsWelcomePage
