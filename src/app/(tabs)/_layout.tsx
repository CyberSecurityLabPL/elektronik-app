import TabBar from "@/components/navigation/TabBar"
import { Tabs, } from "expo-router"
import { Bone, Calendar, Home, Newspaper, Repeat, Table } from "lucide-react-native"
import React from "react"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerTransparent: true,
      }}
      initialRouteName="index"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="substitutions"
        options={() => ({
          tabBarIcon: Repeat,
        })}
      />
      <Tabs.Screen
        name="timetable"
        options={() => ({
          tabBarIcon: Table,
        })}
      />
      <Tabs.Screen
        name="new-timetable"
        options={() => ({
          tabBarIcon: Bone,
        })}
      />
      <Tabs.Screen
        name="index"
        options={() => ({
          tabBarIcon: Home,
        })}
      />
      <Tabs.Screen
        name="news"
        options={() => ({
          tabBarIcon: Newspaper,
        })}
      />
      <Tabs.Screen
        name="events"
        options={() => ({
          tabBarIcon: Calendar,
        })}
      />
      {/* <Tabs.Screen
        name="radio"
        options={{
          href: null,
          tabBarIcon: Calendar,
          tabBarStyle: { display: "none" },
        }}
      /> */}
    </Tabs>
  )
}
