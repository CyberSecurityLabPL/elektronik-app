import { getStorageData, setStorageData, StorageKeys } from "@/lib/storage"
import { useColorScheme } from "nativewind"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"

type Theme = "light" | "dark" | "system"

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
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme()

  useLayoutEffect(() => {
    const fetchTheme = async () => {
      const result = await getStorageData(StorageKeys.theme)

      if (result.success) {
        setColorScheme(result.data)
      } else {
        setColorScheme("system")
      }
    }

    fetchTheme()
  }, [])

  const toggleTheme = async () => {
    toggleColorScheme()
    console.log(colorScheme)
  }
  useEffect(() => {
    const xd = async () => {
      const result = await setStorageData(
        StorageKeys.theme,
        colorScheme ?? "system",
      )

      if (result.success) {
        console.log("Theme set: ", result.data)
      } else {
        // Handle error
        console.error("Failed to set theme:", result.error)
      }
    }
    xd()
  }, [colorScheme])

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme ?? "system",
        toggleTheme,
        setTheme: setColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
