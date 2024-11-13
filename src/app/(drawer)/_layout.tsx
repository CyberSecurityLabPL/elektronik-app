import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import Sidebar from "@/components/navigation/Sidebar"

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1 min-h-screen">
      <Drawer
        screenOptions={{
          headerShown: false,
          // swipeEnabled: false,
          drawerType: "slide",
          drawerInactiveBackgroundColor: "#1f2026",
          drawerInactiveTintColor: "#b6b6d9",
          drawerPosition: "right",
        }}
        drawerContent={Sidebar}
      >
        <Drawer.Screen
          name="(settings)"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
