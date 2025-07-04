import React from 'react'
import { Footer } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'

const FooterEnhanced: React.FunctionComponent = () => {
  const languageCode = useLanguageCode()

  return (
    <Footer
      cmsURL={settings.CMS_ORIGIN}
      languageCode={languageCode}
    />
  )
}

export default FooterEnhanced
