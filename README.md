# okp-i18n &middot; [![npm version](https://img.shields.io/npm/v/@mcpronovost/okp-i18n.svg?style=flat)](https://www.npmjs.com/package/@mcpronovost/okp-i18n) [![npm license](https://img.shields.io/npm/l/@mcpronovost/okp-i18n?color=%231081c2)](https://github.com/mcpronovost/okp-i18n/blob/main/LICENSE) &middot; [![made in Canada](https://img.shields.io/badge/made%20in-Canada-FF0000)](#) [![made in Québec](https://img.shields.io/badge/fait%20au-Québec-003399)](#)

OKP i18n is a lightweight internationalization solution specifically designed for Vite-based projects with multilingual support.

## Features

1. **Check Missing Translation**
    - **Translation Key Detection**: Automatically scans files for `t()` function calls to identify translation keys in use
    - **Recursive File Scanning**: Automatically traverses all subdirectories to find translation files and source code
    - **Clear Error Reporting**: Shows missing translation keys with their source file locations
    - **Configurable**: Customize supported languages, file extensions, and directories
    - **Smart Language Code Handling**: Supports regional language codes (e.g., "en-US" is mapped to "en")
    - **CI/CD Ready**: Can be integrated into continuous integration pipelines to catch missing translations before deployment

## Installation

```bash
npm i @mcpronovost/okp-i18n
```

## Configuration

(TODO)

## Key Components

(TODO)

## Example Usage

(TODO)

## Peer Dependencies

- **[Vite](https://vitejs.dev/)** (version 6 or higher)

## License

This project is licensed under the [BSD-3-Clause License](LICENSE).
