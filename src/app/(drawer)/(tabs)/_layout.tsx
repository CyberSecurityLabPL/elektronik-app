import TabBar from "@/components/navigation/TabBar"
import useColors from "@/hooks/useColors"
import { Tabs } from "expo-router"
import { Calendar, Home, Newspaper, Repeat, Table } from "lucide-react-native"
import React from "react"

export default function TabLayout() {
  const colors = useColors()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: colors.background },
      }}
      initialRouteName="index"
      backBehavior="initialRoute"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="substitutions"
        options={{
          tabBarIcon: Repeat,
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          tabBarIcon: Table,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: Home,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          tabBarIcon: Newspaper,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          tabBarIcon: Calendar,
        }}
      />
    </Tabs>
  )
}
