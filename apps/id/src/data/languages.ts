export enum LanguageCode {
  en = 'en',
}

export const LANGUAGE_CODE_LIST = Object.values(LanguageCode)
export const DEFAULT_LANGUAGE_CODE = LanguageCode.en

enum LanguageDirection {
  ltr = 'ltr',
  rtl = 'rtl',
}

export type LanguageMeta = {
  tag: string;
  dir: LanguageDirection;
  title: string;
  shorthand: string;
}

type Languages = {
  [L in LanguageCode]: LanguageMeta;
}

export const LANGUAGES: Languages = {
  [LanguageCode.en]: {
    tag: 'en',
    dir: LanguageDirection.ltr,
    title: 'English',
    shorthand: 'en',
  }
}
