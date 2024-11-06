import { useColorScheme } from "nativewind"
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react"

type Theme = "light" | "dark"

interface IThemeContext {
	theme: Theme
	toggleTheme: () => void
	setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<IThemeContext>({
	theme: "light",
	toggleTheme: () => {},
	setTheme: () => {},
})

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const { colorScheme, toggleColorScheme } = useColorScheme()
	const [theme, setTheme] = useState<Theme>(colorScheme ?? "light")

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
		toggleColorScheme()
	}

	useEffect(() => {
		console.log("Theme changed to: ", theme)
	}, [theme])

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
