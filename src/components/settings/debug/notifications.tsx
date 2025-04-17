import { CopyToClipboard } from '@/components/CopyToClipboard'
import { Loader } from '@/components/Loader'
import Button from '@/components/ui/Button'
import {usePushNotificationPermission} from '@/hooks/notifications/usePushNotificationPermission'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { getApp } from "@react-native-firebase/app";
import { getToken as getFBToken, getMessaging, registerDeviceForRemoteMessages } from "@react-native-firebase/messaging";

export const NotificationsDebug = () => {
    const {
        hasPermission: hasNotificationPermission,
        isLoading,
    } = usePushNotificationPermission()
    const [token, setToken] = useState<string | null>(null)

    if (isLoading) return (
        <Loader />
    )

    const handleGetToken = async () => {
        const messaging = getMessaging(getApp())
        await registerDeviceForRemoteMessages(messaging)
        const fbToken = await getFBToken(messaging)
        setToken(fbToken)
    }
  
    return (
        <View>
            {hasNotificationPermission && (
                <Button text="Get Firebase Token" onPress={handleGetToken} />
            )}
            {token && (
                <View className='flex'>
                    <Text className='text-foreground'>{token}</Text>
                    <CopyToClipboard content={token} />
                </View>
            )}
        </View>
    )
}