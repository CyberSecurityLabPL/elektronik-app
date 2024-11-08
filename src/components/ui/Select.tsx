import useColors from "@/hooks/useColors"
import {
	Picker,
	PickerItemProps,
	PickerProps,
} from "@react-native-picker/picker"
import { View } from "lucide-react-native"
import { TouchableOpacity } from "react-native"

export function Select({ children, ...props }: PickerProps) {
	const colors = useColors()
	//todo use the colors later to style the select more

	return (
		<TouchableOpacity className="bg-background-secondary rounded-3xl p-1">
			<Picker {...props}>{children}</Picker>
		</TouchableOpacity>
	)
}

export function SelectItem({ ...props }: PickerItemProps) {
	//todo style this
	return <Picker.Item {...props} />
}
