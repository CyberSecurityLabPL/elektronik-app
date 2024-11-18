import { useTheme } from "@/components/Providers/ThemeProvider"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import LargeButton from "@/components/ui/LargeButton"
import Modal from "@/components/ui/Modal"
import useColors from "@/hooks/useColors"
import { clearStorage } from "@/lib/storage"
import { Bell, Languages, Sun, User2, X } from "lucide-react-native"
import { useColorScheme } from "nativewind"
import { useState } from "react"
import { Text, View } from "react-native"
import { toast } from "sonner-native"

// Todo: change this to a dynamic value from storage
const currentlySelectedLanguage = "Polski"

const Settings = () => {
  const colors = useColors()
  const [themeModalOpen, setThemeModalOpen] = useState(false)

  // Todo: change this to a dynamic value from storage
  const { colorScheme, setColorScheme } = useColorScheme()
  const theme = useTheme()

  return (
    <ScreenWrapper>
      <Heading title="Ustawienia" screen="settings" />
      <View className="gap-2">
        <LargeButton
          text="Profil"
          extendable
          iconColor={colors.foreground}
          LucideIcon={User2}
          href={"/(drawer)/(settings)/profile"}
          strokeWidth={1.5}
        />
        <LargeButton
          text="Powiadomienia"
          extendable
          iconColor={colors.foreground}
          LucideIcon={Bell}
          href={"/(drawer)/(settings)/notifications"}
          strokeWidth={1.5}
        />
        <LargeButton
          text="Motyw"
          extendable
          iconColor={colors.foreground}
          LucideIcon={Sun}
          onPress={() => setThemeModalOpen(true)}
          strokeWidth={1.5}
          extraText={colorScheme === "dark" ? "Ciemny" : "Jasny"}
        />
        <LargeButton
          text="Język"
          extendable
          iconColor={colors.foreground}
          LucideIcon={Languages}
          href={"/(drawer)/(settings)/language"}
          strokeWidth={1.5}
          extraText={currentlySelectedLanguage}
        />
        <LargeButton
          text="Clear storage"
          onPress={async () => {
            await clearStorage()
            toast("Storage Cleared!")
          }}
        />
        <Modal
          id="bells"
          isOpen={themeModalOpen}
          onClose={() => setThemeModalOpen(false)}
        >
          <View className="w-96 rounded-2xl flex flex-col justify-between items-center bg-background">
            <View className="p-4 w-full flex gap-2">
              <Text className="text-3xl text-foreground font-pmedium text-center p-6">
                Motywy
              </Text>
              <LargeButton
                text="Jasny"
                onPress={() => {
                  theme.setTheme("light")
                  setColorScheme("light")
                  toast("Switching theme to light...")
                }}
                selected={colorScheme === "light"}
              />
              <LargeButton
                text="Ciemny"
                onPress={() => {
                  theme.setTheme("dark")
                  setColorScheme("dark")
                  toast("Switching theme to dark...")
                }}
                selected={colorScheme === "dark"}
              />
            </View>
            <IconButton
              LucideIcon={X}
              iconColor={colors.foreground}
              onPress={() => setThemeModalOpen(false)}
              className="my-4"
            />
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  )
}

export default Settings
