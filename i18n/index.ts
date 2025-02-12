/// <reference types="vite/client" />

import type {
  VersionType,
  I18nConfigType,
  LangType,
} from "./types";

/**
 * I18n version number
 * @since 0.1.0
 */
export const version: VersionType = "0.1.0";

/**
 * Core i18n configuration
 * Default settings that can be overridden via initI18n()
 * @since 0.1.0
 */
export const i18nConfig: I18nConfigType = {
  defaultLang: "en",
  supportedLangs: ["en"],
  localesPath: "/src/locales",
};

/**
 * Loaded locales
 * @since 0.1.0
 */
let loadedLocales: Record<string, Record<string, string>> = {};

/**
 * Initialize i18n with custom configuration
 * @param config Configuration object
 * @param config.defaultLang Default language code
 * @param config.supportedLangs Array of supported languages
 * @param config.localesPath Path to the locales folder
 * @example
 * ```ts
 * initI18n({
 *   defaultLang: "en",
 *   supportedLangs: ["en", "fr"],
 *   localesPath: "/src/locales",
 * });
 * ```
 * @since 0.1.0
 */
export const initI18n = async (config: Partial<I18nConfigType> = {}): Promise<void> => {
  Object.assign(i18nConfig, config);
  // Load translations immediately during initialization
  loadedLocales = await i18nConfig.supportedLangs.reduce(async (acc, lang) => {
    const prevAcc = await acc;
    const translations = await importTranslations(lang);
    return {
      ...prevAcc,
      [lang]: translations,
    };
  }, Promise.resolve({} as Record<string, Record<string, string>>));
};

/**
 * Import translations
 * @since 0.1.0
 */
const importTranslations = async (lang: string) => {
  try {
    const module = await import(/* @vite-ignore */ `${i18nConfig.localesPath}/${lang}.json`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load translation file for language: ${lang}.`);
    return {};
  }
};

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
  lang: LangType = i18nConfig.defaultLang
) => {
  const translation = loadedLocales[lang]?.[key];
  console.log("translation", loadedLocales);
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
export const getTranslation = (lang: LangType = i18nConfig.defaultLang) => {
  return {
    t: (key: string, count?: number) => t(key, count, lang),
  };
};
