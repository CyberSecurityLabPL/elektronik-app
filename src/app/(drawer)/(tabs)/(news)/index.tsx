import NewsCard from "@/components/cards/NewsCard"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import { cn } from "@/lib/utils"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Animated, Pressable, Text, View, Dimensions } from "react-native"

const News = () => {
  const [activeTab, setActiveTab] = useState(0)
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
    <ScreenWrapper>
      <Heading title="Ogłoszenia" />
      <View className="bg-background-secondary h-16 rounded-2xl flex flex-row justify-around items-center px-2 relative overflow-hidden mt-4">
        {/* Animated Background */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: tabWidth - MARGIN * 2,
              height: 48,
              backgroundColor: "#6994ff",
              borderRadius: 12,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />

        {/* First Tab */}
        <Pressable
          onPress={() => setActiveTab(0)}
          className="w-1/2 h-12 flex justify-center items-center"
        >
          <Text
            className={cn(
              activeTab == 0 ? "text-white" : "text-zinc-600",
              "text-xl font-psemibold ",
            )}
          >
            Szkolne
          </Text>
        </Pressable>

        {/* Second Tab */}
        <Pressable
          onPress={() => setActiveTab(1)}
          className="w-1/2 h-12 flex justify-center items-center"
        >
          <Text
            className={cn(
              activeTab == 1 ? "text-white" : "text-zinc-600",
              "text-xl font-psemibold ",
            )}
          >
            Samorządu
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <View className="bg-background-secondary mt-4 min-h-full rounded-2xl p-4">
        {activeTab == 0 ? (
          <NewsCard
            title="Szkolne"
            description={"dsadsdadasd"}
            isFeatured
            date="21 czerwca"
            onPress={() => router.push("/(tabs)/(news)/1")}
            image="https://plus.unsplash.com/premium_photo-1683121584322-ecd840dd9c41?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ) : (
          <NewsCard
            title="Samorządu"
            description={"dsadsdadasd"}
            isFeatured
            date="21 czerwca"
            image="https://images.unsplash.com/photo-1721332150382-d4114ee27eff?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
      </View>
    </ScreenWrapper>
  )
}

export default News
