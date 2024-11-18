import { de, enUS, pl, uk, cs, zhCN } from "date-fns/locale"
import { t } from "i18next"

export default {
  DAYS_BEFORE_EVENT: 14,
}
export const localeMap = {
  pl: pl,
  en: enUS,
  uk: uk,
  de: de,
  cs: cs,
  zh: zhCN,
}

export const languages = [
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
]
