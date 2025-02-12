export type VersionType = `${number}.${number}.${number}`;

export interface RouterRegex {
  LANG_CODE: RegExp;
};

export interface I18nConfigType {
  defaultLang: string;
  currentLang: string;
  supportedLangs: string[];
  useUrlLang: boolean;
  localesPath: string;
}

export type LangType = string;
