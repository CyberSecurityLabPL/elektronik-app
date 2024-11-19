import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { cz, de, en, es, fr, pl, uk, zh } from "./translations"
import { getStorageData, setStorageData, StorageKeys } from "@/lib/storage"

import { LanguageDetectorModule } from "i18next"

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  async: true,
  // @ts-expect-error config does not expect promise but should
  detect: async (callback: (lng: string) => void) => {
    try {
      const result = await getStorageData(StorageKeys.language)

      if (result.success && result.data) {
        console.log("Language detection result:", result.data)
        callback(result.data)
      } else {
        await setStorageData(StorageKeys.language, "pl")
        console.log("Setting default language: pl")
        callback("pl")
      }
    } catch (error) {
      console.log("Language detection error:", error)
      callback("pl")
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await setStorageData("language", language)
      console.log("language was set to: ", language)
    } catch (error) {
      console.log("Error caching user language:", error)
    }
  },
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: { translation: en },
      pl: { translation: pl },
      uk: { translation: uk },
      de: { translation: de },
      cz: { translation: cz },
      zh: { translation: zh },
      es: { translation: es },
      fr: { translation: fr },
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n