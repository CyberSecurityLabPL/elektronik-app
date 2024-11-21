import { useTranslation } from "react-i18next"

const useLanguage = () => {
  const { t } = useTranslation()
  const languages = [
    {
      code: "pl",
      nativeName: "Polski",
      localName: t("Settings.languages.polish"),
    },
    {
      code: "en",
      nativeName: "English",
      localName: t("Settings.languages.english"),
    },
    {
      code: "uk",
      nativeName: "Українська",
      localName: t("Settings.languages.ukrainian"),
    },
    {
      code: "de",
      nativeName: "Deutch",
      localName: t("Settings.languages.german"),
    },
    {
      code: "cz",
      nativeName: "české republice",
      localName: t("Settings.languages.czech"),
    },
    {
      code: "zh",
      nativeName: "中文",
      localName: t("Settings.languages.chinese"),
    },
    {
      code: "es",
      nativeName: "Español",
      localName: t("Settings.languages.spanish"),
    },
    {
      code: "fr",
      nativeName: "Français",
      localName: t("Settings.languages.french"),
    },
    {
      code: "ja",
      nativeName: "日本語",
      localName: t("Settings.languages.japanese"),
    },
    {
      code: "ko",
      nativeName: "한국어",
      localName: t("Settings.languages.korean"),
    },
    {
      code: "edgy",
      nativeName: "Edgy",
      localName: t("Settings.languages.edgy"),
    },
  ]
  return languages
}

export default useLanguage
