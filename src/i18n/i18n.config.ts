import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { cz, de, en, pl, uk, zh } from "./translations"
import { getStorageData, setStorageData, StorageKeys } from "@/lib/storage"

import { LanguageDetectorModule } from "i18next"

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",

  detect: () => {
    let detectedLanguage = "pl" // default language

    getStorageData(StorageKeys.language)
      .then((result) => {
        if (result.success) {
          detectedLanguage = result.data
        } else {
          setStorageData(StorageKeys.language, "pl")
          detectedLanguage = "pl"
        }
      })
      .catch((error) => {
        console.log("Language detection error:", error)
      })

    return detectedLanguage
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await setStorageData("language", language)
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
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
