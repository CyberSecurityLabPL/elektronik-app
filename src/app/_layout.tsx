import QueryProvider from "@/components/Providers/QueryProvider"
import ThemeProvider from "@/components/Providers/ThemeProvider"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import "../global.css"
import i18n from "../i18n/i18n.config"
import { I18nextProvider } from "react-i18next"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Drawer from "expo-router/drawer"
import Sidebar from "@/components/navigation/Sidebar"
import { StatusBar } from "expo-status-bar"
import { Toaster } from "sonner-native"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // Font loading
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
              <Drawer.Screen name="(tabs)" />
              <Drawer.Screen
                name="settings"
                options={{ swipeEnabled: false }}
              />
              <Drawer.Screen name="welcome" options={{ swipeEnabled: false }} />
            </Drawer>
          </GestureHandlerRootView>
          <StatusBar style="auto" />
          <Toaster />
        </ThemeProvider>
      </I18nextProvider>
    </QueryProvider>
  )
}
