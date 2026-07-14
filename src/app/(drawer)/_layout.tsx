import Sidebar from "@/components/navigation/Sidebar"
import useColors from "@/hooks/useColors"
import Drawer from "expo-router/drawer"

export default function DrawerLayout() {
  const colors = useColors()

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        // "front" overlays the drawer above the scene instead of moving it,
        // which keeps the animation cheap and never reveals the navigator
        // background behind the shifted scene
        drawerType: "front",
        drawerPosition: "right",
        swipeEnabled: false,
        overlayColor: "rgba(0, 0, 0, 0.5)",
        drawerStyle: {
          width: "82%",
          backgroundColor: colors.background,
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
      drawerContent={Sidebar}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  )
}
