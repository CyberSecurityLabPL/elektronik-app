import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import LargeButton from "@/components/ui/LargeButton"
import useColors from "@/hooks/useColors"
import { clearStorage } from "@/lib/storage"
import { Bell, Languages, Sun, User, User2 } from "lucide-react-native"
import { useColorScheme } from "nativewind"
import { Text, View } from "react-native"

// Todo: change this to a dynamic value from storage
const currentlySelectedLanguage = "Polski"

const Settings = () => {
  const colors = useColors()

  // Todo: change this to a dynamic value from storage
  const { colorScheme } = useColorScheme()

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
          href={"/(drawer)/(settings)/theme"}
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
        <LargeButton text="Clear storage" onPress={() => clearStorage()} />
      </View>
    </ScreenWrapper>
  )
}

export default Settings
