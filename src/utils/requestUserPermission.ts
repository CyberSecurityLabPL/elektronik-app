import { getApp } from "@react-native-firebase/app"
import {PermissionsAndroid, Platform} from 'react-native'
import { AuthorizationStatus, getMessaging, requestPermission } from "@react-native-firebase/messaging"
import { catchError } from "./catchError"
import { checkNotificationPermission } from "@/hooks/notifications/usePushNotificationPermission"

/**
 * Requests notification permissions from the user
 * @returns {Promise<boolean>} True if permission was granted, false otherwise
 */
export const requestUserPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        // Android 13+ (API 33+) requires POST_NOTIFICATIONS permission
        const [permissionError, permissionGranted] = await catchError(
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        )
        console.log(permissionError, permissionGranted)
        if (permissionGranted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) return permissionGranted
        if (permissionError || !permissionGranted) return false
        else return true
    }
    else if (Platform.OS === 'android' && Platform.Version < 33) {
        // For Android below 13, notifications are permitted by default
        return true
    }

    const [permissionError, permissionGranted] = await catchError(checkNotificationPermission())
    if (permissionError) return false
    if (permissionGranted) return true

    const messagingInstance = getMessaging(getApp())
    const [authStatusError, authStatus] = await catchError(requestPermission(messagingInstance))
    if (authStatusError) return false

    const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL

    if (enabled) {
        console.log('Authorization status:', authStatus)
        return true
    }

    return false
}