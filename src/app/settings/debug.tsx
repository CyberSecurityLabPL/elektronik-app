import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import { VersionIndicator } from "@/components/VersionIndicator"
import { useTranslation } from "react-i18next"
import { NotificationsDebug } from "@/components/settings/debug/notifications"
import { ScrollView } from 'react-native'

const Debug = () => {
    const { t } = useTranslation()

    return (
        <ScreenWrapper>
            <Heading title={t("Settings.debug.heading")} screen="settings" />
            <ScrollView contentContainerClassName="flex flex-col gap-y-4">
                <VersionIndicator position="content" />
                <NotificationsDebug />
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Debug