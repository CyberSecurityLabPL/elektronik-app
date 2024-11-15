import useColors from "@/hooks/useColors"
import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"
import { Animated, Dimensions, Pressable, Text, View } from "react-native"

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: number
  setActiveTab: (n: number) => void
}) => {
  const colors = useColors()

  const slideAnim = useRef(new Animated.Value(0)).current

  const containerWidth = Dimensions.get("window").width - 24

  const tabWidth = (containerWidth - 32) / 2

  const MARGIN = 4
  const START_POSITION = MARGIN
  const END_POSITION = tabWidth + MARGIN

  const animateSlide = (toValue: number) => {
    Animated.spring(slideAnim, {
      toValue: toValue === 0 ? START_POSITION : END_POSITION,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start()
  }

  useEffect(() => {
    animateSlide(activeTab)
  }, [activeTab])

  return (
    <View className="bg-background-secondary h-16 rounded-2xl flex flex-row justify-around items-center px-2 relative overflow-hidden">
      <Animated.View
        style={[
          {
            position: "absolute",
            width: tabWidth - MARGIN * 2,
            height: 48,
            backgroundColor: colors.primary,
            borderRadius: 12,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      />
      <Pressable
        onPress={() => setActiveTab(0)}
        className="w-1/2 h-12 flex justify-center items-center"
      >
        <Text
          className={cn(
            activeTab === 0 ? "text-white" : "text-foreground-secondary",
            "text-xl font-psemibold",
          )}
        >
          Szkolne
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setActiveTab(1)}
        className="w-1/2 h-12 flex justify-center items-center"
      >
        <Text
          className={cn(
            activeTab === 1 ? "text-white" : "text-foreground-secondary",
            "text-xl font-psemibold",
          )}
        >
          Samorządu
        </Text>
      </Pressable>
    </View>
  )
}

export default Tabs
