import ScreenWrapper from "@/components/ScreenWrapper"
import useColors from "@/hooks/useColors"
import { Stack } from "expo-router"
import React from "react"
import { useTranslation } from "react-i18next"
import { WebView } from "react-native-webview"

const RadioElektron = () => {
  const colors = useColors()
  const { t } = useTranslation()

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t("Sidebar.radio"),
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.foreground,
          headerShadowVisible: false,
        }}
      />
      <ScreenWrapper className="p-0">
        <WebView
          pullToRefreshEnabled
          injectedJavaScript="const clearAds = setInterval(()=>{const links = document.getElementsByTagName('a');for (a of links) {if(a.href.includes('bit.ly')){a.parentElement.parentElement.remove();break;}};const ads = document.getElementsByClassName('adsbygoogle');for(ad of ads){ad.remove();} const badge = document.querySelector('#ft-floating-toolbar'); badge.remove()},500);setTimeout(()=>clearInterval(clearAds),10000);"
          source={{ uri: "https://partyvote.ciac.me/party/radio-elektron" }}
        />
      </ScreenWrapper>
    </>
  )
}

export default RadioElektron
