import { Pressable, Text, View } from "react-native"
import Switch from "./Switch"

interface SwitchButtonProps {
  title: string
  subtitle?: string
  onPress: () => void
  isEnabled?: boolean
}

export default function SwitchButton({
  onPress,
  title,
  subtitle,
  isEnabled = true,
}: SwitchButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      className="flex flex-row justify-between items-center p-4 bg-background-secondary rounded-2xl h-fit"
      onPress={onPress}
    >
      <View className="">
        <Text className="text-foreground font-pmedium text-xl">{title}</Text>
        {subtitle ? (
          <Text className="text-foreground-secondary font-pregular text-[10px] max-w-72">
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Switch onPress={onPress} isEnabled={isEnabled} />
    </Pressable>
  )
}