import colors from "@/constants/colors"
import { useColorScheme } from "nativewind"

// This hook returns the colors object based on the color scheme.
// The color scheme is imported from 'colors' constant.
const useColors = () => {
	const { colorScheme } = useColorScheme()

	if (colorScheme === "dark") {
		return colors.dark
	}

	return colors.light
}

export default useColors
