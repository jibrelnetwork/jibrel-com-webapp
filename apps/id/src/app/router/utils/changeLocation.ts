import settings from 'app/settings'

import { AvailableNextPages } from './checkRedirectParams'

const NEXT_PAGES_MAP = {
  [AvailableNextPages.main]: `//${settings.FRONTEND_ROOT_DOMAIN_NAME}/en/companies`,
  [AvailableNextPages.invest]: `//investor.${settings.FRONTEND_ROOT_DOMAIN_NAME}/invest`,
  [AvailableNextPages.portfolio]: `//investor.${settings.FRONTEND_ROOT_DOMAIN_NAME}/portfolio`,
}

export default function changeLocation({
  next,
  slug,
}: Record<string, any>): boolean {
  const nextPageURL = NEXT_PAGES_MAP[next]

  if (!nextPageURL) {
    return false
  }

  window.location.href = `${nextPageURL}/${slug}`

  return true
}
