import ScreenWrapper from "@/components/ScreenWrapper"
import React from "react"
import { WebView } from "react-native-webview"

const RadioElektron = () => {
  "docuemnt.getElementsByClassName"

  return (
    <ScreenWrapper className="p-0">
      <WebView
        pullToRefreshEnabled
        injectedJavaScript="const clearAds = setInterval(()=>{const links = document.getElementsByTagName('a');for (a of links) {if(a.href.includes('bit.ly')){a.parentElement.parentElement.remove();break;}};const ads = document.getElementsByClassName('adsbygoogle');for(ad of ads){ad.remove();} const badge = document.querySelector('#ft-floating-toolbar'); badge.remove()},500);setTimeout(()=>clearInterval(clearAds),10000);"
        source={{ uri: "https://partyvote.ciac.me/party/radio-elektron" }}
      />
    </ScreenWrapper>
  )
}

export default RadioElektron
