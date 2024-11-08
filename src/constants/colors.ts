import { Colors } from "@/types/colors"

const primary = "#7293FF"

const colors = {
	primary,
	light: {
		primary,
		navIcon: "#686687",
		foreground: "#434356",
		foregroundSecondary: "#a09cc9",
		background: "#ffffff",
		backgroundSecondary: "#f5f6ff",
	},
	dark: {
		primary,
		navIcon: "#5c5a74",
		foreground: "#b5b5d9",
		foregroundSecondary: "#5b5973",
		background: "#1a1a1f",
		backgroundSecondary: "#202127",
	},
} satisfies Colors

export default colors
