import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { checkFirstTimeUser } from "@/lib/utils"
import { router, Slot } from "expo-router"

const WelcomeLayout = () => {
  useEffect(() => {
    checkFirstTimeUser().then((shouldRedirect) => {
      if (shouldRedirect) {
        router.push("/home")
      }
    })
  }, [])
  return <Slot initialRouteName={"about-app"} />
}

export default WelcomeLayout
