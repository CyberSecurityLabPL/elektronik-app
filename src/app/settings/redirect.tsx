import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Redirect, router } from "expo-router"

const redirect = () => {
  useEffect(() => {
    router.navigate("/settings")
  }, [])

  return <View className="bg-background flex-1" />
}

export default redirect
