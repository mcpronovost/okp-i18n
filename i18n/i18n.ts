import type { LangType } from "./types";
import { i18nConfig, loadedLocales } from "./config";

/**
 * Get translation with pluralization
 * @param key - The key to translate
 * @param count - The count for pluralization
 * @param lang - The language to use for translations
 * @returns The translated string
 * @since 0.1.0
 */
export const t = (
  key: string,
  count?: number | undefined,
  lang: LangType = i18nConfig.currentLang || i18nConfig.defaultLang || "en"
) => {
  const translation = loadedLocales[lang]?.[key];
  if (typeof translation === "object" && count !== undefined) {
    const rules = new Intl.PluralRules(lang);
    const pluralForm = rules.select(count);
    return translation[pluralForm] || translation["other"];
  }

  if (typeof translation === "object") {
    return translation["other"];
  }

  if (typeof translation === "string") {
    return translation;
  }

  // eslint-disable-next-line no-console
  console.warn(`Translation not found for key: "${key}".`);
  return key;
};

/**
 * Shared hook to use translation
 * @param lang - The language to use for translations
 * @returns Object containing translation function
 * @returns {Function} t - Function to get translated string for a key
 * @returns {Function} t.key - Translation key to look up
 * @returns {Function} t.count - Optional count for pluralization
 * @since 0.1.0
 */
export const getI18n = (lang: LangType = i18nConfig.currentLang || i18nConfig.defaultLang || "en") => {
  return {
    t: (key: string, count?: number) => t(key, count, lang),
  };
};
