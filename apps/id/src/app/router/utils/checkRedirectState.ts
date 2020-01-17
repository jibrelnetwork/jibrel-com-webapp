import { State } from 'router5'
import { LanguageCode } from '@jibrelcom/i18n'

import checkRedirectParams from './checkRedirectParams'

export default function checkRedirectState({
  name,
  params,
}: State, lang: LanguageCode): void {
  if (!checkRedirectParams(params)) {
    throw {
      redirect: {
        name,
        params: { lang },
      }
    }
  }
}
