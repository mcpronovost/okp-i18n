# okp-i18n &middot; [![npm version](https://img.shields.io/npm/v/@mcpronovost/okp-i18n.svg?style=flat)](https://www.npmjs.com/package/@mcpronovost/okp-i18n) [![npm license](https://img.shields.io/npm/l/@mcpronovost/okp-i18n?color=%231081c2)](https://github.com/mcpronovost/okp-i18n/blob/main/LICENSE) &middot; [![made in Canada](https://img.shields.io/badge/made%20in-Canada-FF0000)](#) [![made in Québec](https://img.shields.io/badge/fait%20au-Québec-003399)](#)

OKP i18n is a lightweight internationalization solution specifically designed for Vite-based projects with multilingual support.

## Features

1. **Translation Management**
   - JSON-based translation files
   - Configurable default and supported languages
   - Dynamic translation file loading
   - Automatic fallback when translations missing
   
2. **Translation Functions**
   - Simple t() function for translations
   - Support for pluralization using Intl.PluralRules
   - Language-specific translation via getTranslation()
   - Fallback to key when translation missing

3. **Development Tools**
   - Command-line translation checker
   - Missing translation detection in source files
   - Support for multiple file types (.astro, .jsx, .tsx, .vue)
   - Console warnings for missing translations

## Installation

```bash
npm i @mcpronovost/okp-i18n
```

## Configuration

### Default Configuration

```ts
{
  defaultLang: "en",
  currentLang: "en",
  supportedLangs: ["en"],
  useUrlLang: true,
  localesPath: "/src/locales",
}
```

### Direct Configuration

```ts
import { initI18n } from "@mcpronovost/okp-i18n";

await initI18n({
  defaultLang: "fr",
  supportedLangs: ["en", "fr"],
  localesPath: "/src/services/locales",
});
```

## Key Components

### Translation Files

- Format: JSON files in locales directory
- Supports translations from multiple files
- Supports pluralization rules (one, zero, other)
- Automatic fallback to "other" form

```json
{
  "Hello": "Bonjour",
  "Threads": {
    "one": "Sujet",
    "zero": "Sujet",
    "other": "Sujets"
  },
  "Message": {
    "one": "Message",
    "other": "Messages"
  },
  "User": "Utilisateur"
}
```

### Translation Function

- Simple t() function for accessing translations
- Support for pluralization via count parameter
- Language-specific translations via getTranslation()
- Automatic fallback to key when translation missing

### Translation Checker

- Command-line utility for finding missing translations
- Configurable via command line arguments:
  - `--languages`: Supported language codes (default: ["en"])
  - `--locales`: Path to locales directory (default: "./locales")
  - `--src`: Path to source files (default: "./src")
  - `--extensions`: File extensions to scan (default: [".astro", ".jsx", ".tsx", ".vue"])
- Scans source files for t() function calls
- Reports missing translations with easy to read console output

#### Direct Command

```bash
npx okp-i18n check --languages=en,fr --src=./src --locales=./src/locales
```

#### Script in package.json

```json
  {
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite build && vite preview",
      "lint": "eslint .",
      "check-translations": "check-translations --languages=en,fr --src=./src --locales=./src/_services/locales"
    }
  }
```

## Example Usage

Use default language for translations

```ts
import { useEffect } from "react";
import { t, initI18n } from "@mcpronovost/okp-i18n";

// Initialize i18n
await initI18n({
  defaultLang: "en",
  supportedLangs: ["en", "fr"],
  localesPath: "/src/locales"
});

// Use translations
function Home() {
  return (
    <div>
      <h1>{t("Welcome")}</h1>
      <p>{t("Welcome to the home page")}</p>
    </div>
  );
}
```

Use specific language for translations

```ts
import { useEffect } from "react";
import { getTranslation, initI18n } from "@mcpronovost/okp-i18n";

// Initialize i18n
await initI18n({
  defaultLang: "en",
  supportedLangs: ["en", "fr"],
  localesPath: "/src/locales"
});

// Use specific language translations
function Home() {
  const { t } = getTranslation("fr");
  return (
    <div>
      <h1>{t("Welcome")}</h1>
      <p>{t("Welcome to the home page")}</p>
    </div>
  );
}
```

## Peer Dependencies

- **[Vite](https://vitejs.dev/)** (version 6 or higher)

## License

This project is licensed under the [BSD-3-Clause License](LICENSE).
