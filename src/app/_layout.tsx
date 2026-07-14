import QueryProvider from "@/components/Providers/QueryProvider"
import ThemeProvider from "@/components/Providers/ThemeProvider"
import useColors from "@/hooks/useColors"
import { useFirstTimeUser } from "@/hooks/useFirstTimeUser"
import { useNetInfo } from "@react-native-community/netinfo"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import * as SystemUI from "expo-system-ui"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { I18nextProvider, useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "react-native-reanimated"
import { Toaster } from "sonner-native"
import "../global.css"
import i18n from "../i18n/i18n.config"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Deep links (e.g. /news/[id]) get the tab navigator placed underneath,
// so the back gesture always has somewhere sensible to go.
export const unstable_settings = {
  anchor: "(drawer)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const isFirstTimeUser = useFirstTimeUser()

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

  const ready = loaded && isFirstTimeUser !== null

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync()
    }
  }, [ready])

  if (!ready) {
    return null
  }

  return (
    <QueryProvider>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <ThemeProvider>
          <GestureHandlerRootView className="flex-1">
            <RootNavigator isFirstTimeUser={isFirstTimeUser} />
            <StatusBar style="auto" animated />
            <Toaster />
          </GestureHandlerRootView>
        </ThemeProvider>
      </I18nextProvider>
    </QueryProvider>
  )
}

const RootNavigator = ({ isFirstTimeUser }: { isFirstTimeUser: boolean }) => {
  const { isConnected } = useNetInfo()
  const colors = useColors()

  // The OS window background shows through during screen transitions —
  // keep it in sync with the theme so it never flashes white in dark mode
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background)
  }, [colors])

  return (
    <>
      {!isConnected && <NoInternet />}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Protected guard={!isFirstTimeUser}>
          <Stack.Screen name="(drawer)" />
          <Stack.Screen name="news/[id]" />
          <Stack.Screen name="radio" />
          <Stack.Screen name="settings/index" />
          <Stack.Screen name="settings/profile" />
          <Stack.Screen name="settings/theme" />
          <Stack.Screen name="settings/language" />
          <Stack.Screen name="settings/debug" />
        </Stack.Protected>

        <Stack.Protected guard={isFirstTimeUser}>
          <Stack.Screen name="welcome/index" />
          <Stack.Screen name="welcome/about-app" />
          <Stack.Screen name="welcome/set-up" />
        </Stack.Protected>
      </Stack>
    </>
  )
}

const NoInternet = () => {
  const { t } = useTranslation()

  return (
    <View className="bg-primary absolute top-0 w-full z-[999] pb-2 pt-10">
      <Text className="text-background text-center">
        {t("Error.noInternet")}
      </Text>
    </View>
  )
}
