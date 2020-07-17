import { LanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'

export default function handle403(lang: LanguageCode): void {
  window.location.href = `${settings.ID_ORIGIN}/${lang}/login`
}
