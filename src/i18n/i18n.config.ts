import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { en, pl, uk, zh } from "./translations"

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: { translation: en },
    pl: { translation: pl },
    uk: { translation: uk },
    zh: { translation: zh },
  },
  lng: "pl",
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
