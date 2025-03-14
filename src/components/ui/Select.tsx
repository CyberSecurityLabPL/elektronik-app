import useColors from "@/hooks/useColors"
import { cn } from "@/lib/utils"
import {
  Picker,
  PickerItemProps,
  PickerProps,
} from "@react-native-picker/picker"
import { TouchableOpacity } from "react-native"

export function Select({ children, enabled, className, ...props }: PickerProps) {
  const colors = useColors()

  return (
    <TouchableOpacity
      activeOpacity={1}
      className={cn("bg-background-secondary rounded-3xl p-1 shadow-md", {
        "bg-background-secondary ": !enabled,
      }, className)}
      disabled={!enabled}
    >
      <Picker
        dropdownIconColor={colors.foreground}
        style={{ color: colors.foreground }}
        itemStyle={{ backgroundColor: colors.background }}
        enabled={enabled}
        {...props}
      >
        {children}
      </Picker>
    </TouchableOpacity>
  )
}

export function SelectItem({ ...props }: PickerItemProps) {
  const colors = useColors()

  return (
    <Picker.Item
      style={{ color: colors.foreground }}
      color={colors.background}
      {...props}
    />
  )
}
