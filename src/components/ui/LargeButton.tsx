import { Check, ChevronRight, LucideProps } from "lucide-react-native"
import React from "react"
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import useColors from "@/hooks/useColors"
import { cn } from "@/lib/utils"

interface BaseLargeButtonProps {
  text: string
  extendable?: boolean
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

interface IconLargeButtonProps extends BaseLargeButtonProps {
  LucideIcon: React.FC<LucideProps>
  iconColor: string
  selected?: false
}

interface NoIconLargeButtonProps extends BaseLargeButtonProps {
  LucideIcon?: undefined
  iconColor?: undefined
  extraText?: undefined
  selected?: boolean
}

interface SelectedNoIconLargeButtonProps extends NoIconLargeButtonProps {
  selected: true
}

interface ExtendableExtraLargeButtonProps extends BaseLargeButtonProps {
  extendable: true
  extraText: string
}

interface ExtendableLargeButtonProps extends BaseLargeButtonProps {
  extendable?: true
  extraText?: undefined
}

type LargeButtonProps =
  | (IconLargeButtonProps &
      (ExtendableExtraLargeButtonProps | ExtendableLargeButtonProps))
  | (NoIconLargeButtonProps | SelectedNoIconLargeButtonProps)

const LargeButton = ({
  className,
  LucideIcon,
  iconColor,
  text,
  extendable,
  extraText,
  selected,
  onPress,
}: LargeButtonProps & { className?: string }) => {
  const colors = useColors()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={cn(
        `flex flex-row ${
          extendable || selected ? "justify-between" : "justify-start"
        } items-center w-full bg-background-secondary p-4 rounded-2xl min-h-16`,
        className,
      )}
    >
      <View className="flex flex-row justify-center items-center gap-4">
        {LucideIcon ? (
          <View>
            <LucideIcon size={32} color={iconColor} />
          </View>
        ) : null}
        <View>
          <Text
            className={`text-lg font-pmedium ${
              selected ? "text-primary" : "text-foreground"
            }`}
          >
            {text}
          </Text>
        </View>
      </View>
      {extendable ? (
        <View className="flex flex-row justify-center items-center">
          {extraText ? (
            <View>
              <Text className="font-pmedium text-sm text-primary">
                {extraText}
              </Text>
            </View>
          ) : null}
          <View>
            <ChevronRight size={24} color={iconColor} />
          </View>
        </View>
      ) : selected ? (
        <View className="flex flex-row justify-center items-center">
          <View>
            <Check size={24} color={colors.primary} />
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

export default LargeButton
