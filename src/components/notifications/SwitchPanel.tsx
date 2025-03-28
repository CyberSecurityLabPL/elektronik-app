import { usePushNotificationPermission } from "@/hooks/notifications/usePushNotificationPermission";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Platform, Linking, PermissionsAndroid } from "react-native";
import { TopicCard } from "./TopicCard";
import Button from "../ui/Button";
import { catchError } from "@/utils/catchError";
import * as IntentLauncher from "expo-intent-launcher"
import * as Application from 'expo-application'
import { toast } from "sonner-native";
import { Loader } from "lucide-react-native";
import useColors from "@/hooks/useColors";
import { requestUserPermission } from "@/utils/requestUserPermission";

export const SwitchPanel = ({
    isLoading,
    setIsLoading,
    withAdditionalStyles = false
}: {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    withAdditionalStyles?: boolean
}) => {
    const { t } = useTranslation()
    const {
        hasPermission: hasNotificationPermission,
        isLoading: isLoadingNotificationPermission,
    } = usePushNotificationPermission()
    const [isBlocked, setIsBlocked] = useState(false)
    const colors = useColors()

    return (<>
        {(hasNotificationPermission && !isLoadingNotificationPermission)
            ? (
                <View className="flex flex-col gap-y-4">
                    <TopicCard
                        title={t("Settings.notifications.nSchoolTitle")}
                        topic="school-announcements"
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        withAdditionalStyles={withAdditionalStyles}
                    >{t("Settings.notifications.nSchoolSub")}</TopicCard>
                    <TopicCard
                        title={t("Settings.notifications.nCouncilTitle")}
                        topic="council-articles"
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        withAdditionalStyles={withAdditionalStyles}
                    >{t("Settings.notifications.nCouncilSub")}</TopicCard>
                    <TopicCard
                        title={t("Settings.notifications.nSubtitutionsTitle")}
                        topic="substitutions"
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        withAdditionalStyles={withAdditionalStyles}
                    >{t("Settings.notifications.nSubtitutionsSub")}</TopicCard>
                </View>
            )
            : (!hasNotificationPermission && !isLoadingNotificationPermission)
                ? isBlocked
                    ? (
                        <View>
                            <Text className="text-3xl font-psemibold text-foreground">Brak uprawnień</Text>
                            <Text className="text-foreground">Hej, masz zablokowany dostęp do powiadomień 😔. Jeśli chcesz otrzymywać informacje o <Text>zastępstwach</Text>, <Text>wydarzeniach</Text> i <Text>ogłoszeniach</Text> przejdź do ustawień i uruchom ręcznie (potem możesz wybrać kategorię samemu 😉)</Text>
                            <Button
                                text="Otwórz ustawienia"
                                className="mt-4 bg-background border border-primary rounded-2xl"
                                textClassName="text-sm text-primary"
                                onPress={async () => {
                                    if (Platform.OS === 'ios') {
                                        Linking.openSettings();
                                    } else {
                                        const [error] = await catchError(IntentLauncher.startActivityAsync(
                                            IntentLauncher.ActivityAction.APP_NOTIFICATION_SETTINGS,
                                            {
                                                extra: {
                                                    'android.provider.extra.APP_PACKAGE': Application.applicationId
                                                }
                                            }
                                        ))
                                        if (error) {
                                            console.error(error)
                                            toast.error("Nie można otworzyć ustawień powiadomień")
                                        }
                                    }
                                }}
                            />
                        </View>
                    )
                    : (
                        <View>
                            <Text className="text-3xl font-psemibold text-foreground">Zgoda na powiadomienia</Text>
                            <Text className="text-foreground mt-2">Aplikacja może wysyłać ci powiadomienia abyś był/a na bierząco! Obiecujemy brak spamu 😇</Text>
                            <Button
                                text="Włącz powiadomienia"
                                className="mt-8"
                                onPress={async () => {
                                    const status = await requestUserPermission()
                                    if (status == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                                        return setIsBlocked(true)
                                    }
                                }}
                            />
                        </View>
                    )
                : (
                    <Loader color={colors.primary} size={64} />
                )
            }
    </>)
}