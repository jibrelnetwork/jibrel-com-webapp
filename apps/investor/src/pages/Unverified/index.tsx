import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import { PageWithHero } from '@jibrelcom/ui'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'
import heroImage from 'public/images/pic_hero_invest_process.svg'

const Unverified: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <CoreLayout>
      <PageWithHero
        imgSrc={heroImage}
        text={i18n._('Unverified.text')}
        title={i18n._('Unverified.title')}
        buttonLabel={i18n._('Unverified.action.verify')}
        href={`//id.${settings.FRONTEND_ROOT_DOMAIN_NAME}/kyc`}
      />
    </CoreLayout>
  )
}

export default Unverified
