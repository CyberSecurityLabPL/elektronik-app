import { cn } from "@/lib/utils"
import { LucideProps } from "lucide-react-native"
import { TouchableOpacityProps } from "react-native"
import { GestureResponderEvent, TouchableOpacity } from "react-native"

interface IconButtonProps extends TouchableOpacityProps {
  LucideIcon: React.FC<LucideProps>
  iconColor: string
  small?: boolean
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

export default function IconButton({
  LucideIcon,
  iconColor,
  small,
  onPress,
  disabled,
  className,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className={cn(
        className,
        "flex bg-background-secondary justify-center items-center transition-colors",
        small ? "size-12 rounded-xl" : "size-16 rounded-3xl",
        disabled && "opacity-50",
      )}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <LucideIcon size={small ? 20 : 24} color={iconColor} />
    </TouchableOpacity>
  )
}
