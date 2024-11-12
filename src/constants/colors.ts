const primary = "#7293FF"

const colors = {
	primary,
	light: {
		primary,
		navIcon: "#686687",
		foreground: "#434356",
	},
	dark: {
		primary,
		navIcon: "#5c5a74",
		foreground: "#b5b5d9",
	},
} satisfies Colors

// Todo: move to '@/types' later
interface Colors {
	primary: string
	light: ColorScheme
	dark: ColorScheme
}

interface ColorScheme {
	primary: string
	navIcon: string
	foreground: string
}

export default colors
