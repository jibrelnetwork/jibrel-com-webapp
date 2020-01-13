import { LanguageCode } from '@jibrelcom/i18n'

export default {
  [LanguageCode.en]: (): Promise<object> =>
    import('./en/messages')
      .then(({ default: messages }) => messages),
}
