import { Pressable, Text, View } from "react-native"
import Switch from "./Switch"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"

interface SwitchButtonProps {
  title: string
  subtitle?: string
  onPress: () => void
  isEnabled?: boolean,
  componentDisabled?: boolean,
  className?: ClassNameValue
}

export default function SwitchButton({
  onPress,
  title,
  subtitle,
  isEnabled = true,
  componentDisabled = false,
  className
}: SwitchButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      className={cn("flex flex-row justify-between items-center p-4 bg-background-secondary rounded-2xl h-fit", className)}
      onPress={onPress}
      disabled={componentDisabled}
    >
      <View className="">
        <Text className="text-foreground font-pmedium text-xl">{title}</Text>
        {subtitle ? (
          <Text className="text-foreground-secondary font-pregular text-[10px] max-w-64">
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Switch onPress={onPress} isEnabled={isEnabled} />
    </Pressable>
  )
}
