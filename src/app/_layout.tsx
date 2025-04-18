import Sidebar from "@/components/navigation/Sidebar"
import QueryProvider from "@/components/Providers/QueryProvider"
import ThemeProvider from "@/components/Providers/ThemeProvider"
import useColors from "@/hooks/useColors"
import { useFonts } from "expo-font"
import * as NavigationBar from "expo-navigation-bar"
import Drawer from "expo-router/drawer"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { I18nextProvider, useTranslation } from "react-i18next"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "react-native-reanimated"
import { Toaster } from "sonner-native"
import "../global.css"
import i18n from "../i18n/i18n.config"
import { useNetInfo } from "@react-native-community/netinfo"
import { View, Text } from "react-native"
import { registerDevMenuItems } from "expo-dev-menu"
import { Linking } from "react-native"
import { useNotificationRouting } from "@/hooks/notifications/useNotificationRouting"
import { useInAppUpdates } from "@/hooks/useInAppUpdates"

const devMenuItems = [
  {
    name: 'Open Android App Settings',
    callback: async () => {
      try {
        await Linking.openSettings();
      } catch (error) {
        console.error("Failed to open settings:", error);
      }
    }
  }
]

registerDevMenuItems(devMenuItems)

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useNotificationRouting()
  useInAppUpdates()
  const { isConnected } = useNetInfo()
  const colors = useColors()
  NavigationBar.setBackgroundColorAsync(colors.background)

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("@/assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("@/assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("@/assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/poppins/Poppins-SemiBold.ttf"),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryProvider>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <ThemeProvider>
          <GestureHandlerRootView className="flex-1">
            { !isConnected && (
              <NoInternet />
            )}
            <Drawer
              screenOptions={{
                drawerStyle: {
                  width: "82%",
                },
                headerShown: false,
                drawerType: "slide",
                drawerInactiveBackgroundColor: "#1f2026",
                drawerInactiveTintColor: "#b6b6d9",
                drawerPosition: "right",
              }}
              drawerContent={Sidebar}
              initialRouteName="index"
            >
              <Drawer.Screen name="(tabs)" options={{ swipeEnabled: false }} />
              <Drawer.Screen
                name="settings"
                options={{ swipeEnabled: false }}
              />
              <Drawer.Screen name="welcome" options={{ swipeEnabled: false }} />
            </Drawer>
            <StatusBar style="auto" animated translucent />
            <Toaster />
          </GestureHandlerRootView>
        </ThemeProvider>
      </I18nextProvider>
    </QueryProvider>
  )
}

const NoInternet = () => {
  const { t } = useTranslation()

  return (
    <View className="bg-primary absolute top-0 w-full z-[999] pb-2 pt-10">
      <Text className="text-background text-center">{t('Error.noInternet')}</Text>
    </View>
  )
}