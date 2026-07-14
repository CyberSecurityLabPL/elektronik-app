import useColors from "@/hooks/useColors"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react-native"
import { TouchableOpacity, View } from "react-native"

const TabBarIcon = ({
  focused,
  Icon,
  accessibilityState,
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
}: {
  focused: boolean
  Icon: LucideIcon
  accessibilityState: { selected?: boolean }
  accessibilityLabel: string
  testID: string
  onPress: () => void
  onLongPress: () => void
}) => {
  const colors = useColors()

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="py-2.5 justify-center items-center"
    >
      <View
        className={cn(
          "rounded-full p-3",
          focused ? "bg-primary/20" : "bg-transparent",
        )}
      >
        <Icon size={22} color={focused ? colors.primary : colors.foreground} />
      </View>
    </TouchableOpacity>
  )
}

export default TabBarIcon
