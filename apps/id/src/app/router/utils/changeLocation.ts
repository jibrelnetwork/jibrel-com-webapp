import settings from 'app/settings'

import { AvailableSources } from './checkRedirectParams'

const SOURCE_MAP = {
  [AvailableSources.main]: `//${settings.FRONTEND_ROOT_DOMAIN_NAME}/en/companies`,
  [AvailableSources.invest]: `//investor.${settings.FRONTEND_ROOT_DOMAIN_NAME}/invest`,
  [AvailableSources.portfolio]: `//investor.${settings.FRONTEND_ROOT_DOMAIN_NAME}/portfolio`,
}

export default function changeLocation({
  source,
  slug,
}: Record<string, any>): boolean {
  const sourceURL = SOURCE_MAP[source]

  if (!sourceURL) {
    return false
  }

  window.location.href = `${sourceURL}/${slug}`

  return true
}
