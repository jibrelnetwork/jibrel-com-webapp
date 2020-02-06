import { LanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'

const ID_DOMAIN = `id.${settings.FRONTEND_ROOT_DOMAIN_NAME}`

export default function handle403(lang: LanguageCode): void {
  window.location.href = `//${ID_DOMAIN}/${lang}/login`
}
