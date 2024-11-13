import useColors from "@/hooks/useColors"
import {
  Picker,
  PickerItemProps,
  PickerProps,
} from "@react-native-picker/picker"
import { TouchableOpacity } from "react-native"

export function Select({ children, ...props }: PickerProps) {
  const colors = useColors()

  return (
    <TouchableOpacity className="bg-background-secondary rounded-3xl p-1">
      <Picker
        dropdownIconColor={colors.foreground}
        style={{ color: colors.foreground }}
        itemStyle={{ backgroundColor: colors.background }}
        {...props}
      >
        {children}
      </Picker>
    </TouchableOpacity>
  )
}

export function SelectItem({ ...props }: PickerItemProps) {
  const colors = useColors()

  return <Picker.Item color={colors.background} {...props} />
}
