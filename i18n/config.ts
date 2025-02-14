import type { VersionType, I18nConfigType } from "./types";
import { getLangFromUrl, importTranslations } from "./utils";

/**
 * I18n version number
 * @since 0.1.0
 */
export const version: VersionType = "0.1.3";

/**
 * Loaded locales
 * @since 0.1.0
 */
export const loadedLocales: Record<string, Record<string, string>> = {};

/**
 * Core i18n configuration
 * Default settings that can be overridden via initI18n()
 * @since 0.1.0
 */
export const i18nConfig: I18nConfigType = {
  defaultLang: "en",
  currentLang: "en",
  supportedLangs: ["en"],
  useUrlLang: true,
  localesPath: "/src/locales",
};

/**
 * Initialize i18n with custom configuration
 * @param config Configuration object
 * @param config.defaultLang Default language code
 * @param config.currentLang Current language code
 * @param config.supportedLangs Array of supported languages
 * @param config.useUrlLang Whether to use the language code from the URL
 * @param config.localesPath Path to the locales folder
 * @example
 * ```ts
 * initI18n({
 *   defaultLang: "en",
 *   currentLang: "en",
 *   supportedLangs: ["en", "fr"],
 *   localesPath: "/src/locales",
 * });
 * ```
 * @since 0.1.0
 */
export const initI18n = async (
  config: Partial<I18nConfigType> = {}
): Promise<void> => {
  Object.assign(i18nConfig, config);

  if (!i18nConfig.supportedLangs) {
    i18nConfig.supportedLangs = [i18nConfig.defaultLang || "en"];
  }

  // Set current language from URL if enabled
  if (i18nConfig.useUrlLang) {
    const urlLang = getLangFromUrl();
    if (urlLang && i18nConfig.supportedLangs.includes(urlLang)) {
      i18nConfig.currentLang = urlLang;
    }
  }

  // Load translations immediately during initialization
  await i18nConfig.supportedLangs.reduce(async (acc, lang) => {
    const prevAcc = await acc;
    const translations = await importTranslations(i18nConfig.localesPath || "", lang);
    Object.assign(loadedLocales, { [lang]: translations });
    return prevAcc;
  }, Promise.resolve({} as Record<string, Record<string, string>>));
};
