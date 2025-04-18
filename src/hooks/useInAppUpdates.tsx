import { useEffect } from "react"
import { Platform } from "react-native"
import * as ExpoInAppUpdates from "expo-in-app-updates"
import { catchError } from "@/utils/catchError"
import { toast } from "sonner-native"
import { useTranslation } from "react-i18next"

export const useInAppUpdates = () => {
    const { t } = useTranslation()

    useEffect(() => {
        if (__DEV__ || Platform.OS === 'web') return

        const checkForUpdate = async () => {
            if (Platform.OS === 'android') {
                const [updateError] = await catchError(ExpoInAppUpdates.checkAndStartUpdate(false))
                if (updateError) {
                    console.error("Error checking for updates:", updateError)
                }
            } else {
                const [checkError, checkResult] = await catchError(ExpoInAppUpdates.checkForUpdate())
                if (!checkResult?.updateAvailable) return
                toast.warning(t('Update.infoToast'))
            }
        }

        checkForUpdate()
    }, [])
}