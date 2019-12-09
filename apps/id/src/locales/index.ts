import { LanguageCode } from '../data/languages'

export default {
  [LanguageCode.en]: (): Promise<object> =>
    import('./en/messages')
      .then(({ default: messages }) => messages),
}
