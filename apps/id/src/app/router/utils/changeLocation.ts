import settings from 'app/settings'

import { AvailableNextPages } from './checkRedirectParams'

const NEXT_PAGES_MAP = {
  [AvailableNextPages.main]: `${settings.CMS_ORIGIN}/en/companies`,
  [AvailableNextPages.invest]: `${settings.INVESTOR_ORIGIN}/invest`,
  [AvailableNextPages.portfolio]: `${settings.INVESTOR_ORIGIN}/portfolio`,
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
