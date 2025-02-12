export type VersionType = `${number}.${number}.${number}`;

export interface I18nConfigType {
  defaultLang: string;
  supportedLangs: string[];
  localesPath: string;
}

export type LangType = string;
