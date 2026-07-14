import { cn } from "@/lib/utils"
import { BlurTargetView } from "expo-blur"
import React, { PropsWithChildren } from "react"
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"

const ScreenWrapper = ({
  children,
  className,
  ...props
}: PropsWithChildren<SafeAreaViewProps>) => {
  return (
    <SafeAreaView
      className={cn("px-8 py-6 bg-background min-h-screen flex-1", className)}
      {...props}
    >
      {children}
    </SafeAreaView>
  )
}

export default ScreenWrapper
