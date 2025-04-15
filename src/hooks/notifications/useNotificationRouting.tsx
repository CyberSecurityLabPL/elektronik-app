import { getApp } from "@react-native-firebase/app"
import { getInitialNotification, getMessaging, onNotificationOpenedApp } from "@react-native-firebase/messaging"
import { Href, useRouter } from "expo-router"
import { useEffect } from "react"

export const useNotificationRouting = () => {
    const router = useRouter()
    useEffect(() => {
        const messaging = getMessaging(getApp())
        const unsubscribeOpenedApp = onNotificationOpenedApp(messaging, (remoteMessage) => {
            console.log("Notification caused app to open from background state:", remoteMessage.notification)
            if (remoteMessage.data?.URL) {
                router.replace(remoteMessage.data.URL as Href)
            }
        })

        getInitialNotification(messaging)
            .then((remoteMessage) => {
                if (remoteMessage?.data?.URL) {
                    console.log("Notification caused app to open from quit state:", remoteMessage.notification)

                    // Add slight delay to ensure navigation is ready
                    setTimeout(() => {
                        router.push(remoteMessage?.data?.URL as Href)
                    }, 500)
                }
            })

        return () => {
            unsubscribeOpenedApp()
        }
    }, [router])
}