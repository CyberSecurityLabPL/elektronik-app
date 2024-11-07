import { LucideProps } from "lucide-react-native"
import { GestureResponderEvent, TouchableOpacity } from "react-native"

export default function IconButton({
	LucideIcon,
	iconColor,
	small,
	onPress,
}: {
	LucideIcon: React.FC<LucideProps>
	iconColor: string
	small?: boolean
	onPress?: ((event: GestureResponderEvent) => void) | undefined
}) {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			className={`flex bg-background-secondary justify-center items-center ${
				small ? "size-12" : "size-16"
			} ${small ? "rounded-xl" : "rounded-3xl"}`}
			onPress={onPress}
		>
			<LucideIcon size={small ? 20 : 24} color={iconColor} />
		</TouchableOpacity>
	)
}
