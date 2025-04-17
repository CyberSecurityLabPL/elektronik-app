import { cn } from "@/lib/utils"
import { getAppBuildNumber, getAppVersion, getBuildVariant } from "@/utils/buildInfo"
import { Link } from "expo-router"
import { Trans, useTranslation } from "react-i18next"
import { View, Text, Pressable } from "react-native"

export const VersionIndicator = ({ position = 'bottom' }: { position?: 'bottom' | 'content'}) => {
    const version = getAppVersion()
    const buildNumber = getAppBuildNumber()
    const buildVariant = getBuildVariant()
    const { t } = useTranslation()

    return (
        <View className={cn("px-6", {
            'absolute bottom-5 left-0 right-0': position === 'bottom',
            'flex-1 items-center': position === 'content',
        })}>
            <Link href="/settings/debug" asChild>
                <Pressable>
                    <Text className="text-foreground-secondary text-sm text-center">{t('Settings.debug.version')}: {version}  ({buildNumber}) - {buildVariant === 'beta'
                        ? t('Settings.debug.buildVariant.beta')
                        : buildVariant === 'production'
                            ? t('Settings.debug.buildVariant.production')
                            : t('Settings.debug.buildVariant.dev')}</Text>
                </Pressable>
            </Link>
            {(buildVariant !== 'production') && (
                <Text className="text-foreground-secondary text-sm text-center">
                    <Trans
                        i18nKey={'Settings.debug.buildVariant.betaDisclaimer'}
                        components={{
                            redirect: <Link className="text-primary/60" href="https://aplikacja.mopsior.pl" />,
                        }}
                    />
                </Text>
            )}
        </View>
    )
}