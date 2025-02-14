import type { LangType, RouterRegexType } from "./types";

/**
 * Constants for route parsing
 * @since 0.1.2
 */
const REGEX: RouterRegexType = {
  LANG_CODE: /^\/([a-z]{2})(?:\/|$)/i,
};

/**
 * Extract language code from URL path
 * @returns The language code from URL or null if not found
 * @since 0.1.2
 */
export const getLangFromUrl = (): LangType | null => {
  const match = window.location.pathname.match(REGEX.LANG_CODE);
  return match ? (match[1].toLowerCase() as LangType) : null;
};

/**
 * Import translations
 * @since 0.1.0
 */
export const importTranslations = async (path: string, lang: string) => {
  try {
    const module = await import(/* @vite-ignore */ `${path}/${lang}.json`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load translation file for language: ${lang}.`);
    return {};
  }
};
