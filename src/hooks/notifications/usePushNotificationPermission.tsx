import { 
    getMessaging, 
    hasPermission, 
    AuthorizationStatus, 
    registerDeviceForRemoteMessages 
} from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";
import { useEffect, useState } from "react";
import { AppState, AppStateStatus, PermissionsAndroid, Platform } from "react-native";

export const checkNotificationPermission = async () => {
    try {
        const messagingInstance = getMessaging(getApp())
        
        if (Platform.OS === "ios") {
            // Register for remote messages on iOS
            await registerDeviceForRemoteMessages(messagingInstance)
        }

        if (Platform.OS === "android") {
            if (Platform.Version >= 33) {
                // Android 13+ (API 33+) requires POST_NOTIFICATIONS permission
                return await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                )
            } else {
                // For Android below 13, notifications are permitted by default
                return true
            }
        }

        // For iOS and other platforms, use Firebase messaging
        const authStatus = await hasPermission(messagingInstance)
        
        return (
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL
        );
    } catch (error) {
        console.error("Error checking notification permission:", error)
        return false
    }
}

export const usePushNotificationPermission = () => {
    const [hasPermission, setHasPermission] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const checkPermission = async () => {
            setIsLoading(true)
            try {
                const result = await checkNotificationPermission();
                setHasPermission(result)
            } finally {
                setIsLoading(false)
            }
        };
        
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active') {
                checkPermission()
            }
        }        
        
        checkPermission();
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        
        return () => {
            subscription.remove()
        }
    }, [])
    
    return { hasPermission, isLoading }
};