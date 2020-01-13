import React from 'react'
import { Footer } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'

const FooterEnhanced: React.FunctionComponent = () => {
  const languageCode = useLanguageCode()

  return (
    <Footer
      cmsURL={settings.HOST_CMS}
      languageCode={languageCode}
    />
  )
}

export default FooterEnhanced
