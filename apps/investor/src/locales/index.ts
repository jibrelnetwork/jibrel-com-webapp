import { LanguageCode } from '@jibrelcom/languages'

export default {
  [LanguageCode.en]: (): Promise<object> =>
    import('./en/messages')
      .then(({ default: messages }) => messages),
}
