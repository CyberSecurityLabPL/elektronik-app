import { getApp } from "@react-native-firebase/app"
import { getInitialNotification, getMessaging, onNotificationOpenedApp } from "@react-native-firebase/messaging"
import { Href, useRouter } from "expo-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner-native"

export const useNotificationRouting = () => {
    const router = useRouter()
    const { t } = useTranslation()
    
    useEffect(() => {
        const messaging = getMessaging(getApp())
        let timeoutId: NodeJS.Timeout | null = null
        
        const handleNavigation = (url: Href) => {
            if (!url) return
            
            const navigateToRoute = () => {
                try {
                    router.replace(url as Href)
                } catch (error) {
                    console.error("Navigation error:", error)
                    toast.error(t('Notifications.redirectError'))
                }
            }
            
            timeoutId = setTimeout(navigateToRoute, 500)
        }
        
        const unsubscribeOpenedApp = onNotificationOpenedApp(messaging, (remoteMessage) => {
            console.log("Notification caused app to open from background state:", remoteMessage.notification)
            if (remoteMessage.data?.URL) {
                handleNavigation(remoteMessage.data.URL as Href)
            }
        })

        getInitialNotification(messaging)
            .then((remoteMessage) => {
                console.log("Notification caused app to open from quit state:", remoteMessage)
                if (remoteMessage?.data?.URL) {
                    // remoteMessage is null, when it's in development mode (because every launch build app from base). Test navigation when app is in background
                    handleNavigation(remoteMessage.data.URL as Href)
                }
            })
            .catch(error => {
                console.error("Error handling initial notification:", error)
            })

        return () => {
            unsubscribeOpenedApp()
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [router])
}