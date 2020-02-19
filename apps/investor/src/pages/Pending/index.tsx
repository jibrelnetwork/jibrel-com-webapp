import React from 'react'
import { PageWithHero } from '@jibrelcom/ui'

import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'
import heroImage from 'public/images/pic_hero_invest_process.svg'

const Pending: React.FunctionComponent = () => {
  const i18n = useI18n()
  const languageCode = useLanguageCode()

  return (
    <CoreLayout>
      <PageWithHero
        imgSrc={heroImage}
        text={i18n._('Pending.text')}
        title={i18n._('Pending.title')}
        buttonLabel={i18n._('Pending.action.back')}
        href={`${settings.HOST_CMS}/${languageCode}`}
      />
    </CoreLayout>
  )
}

export default Pending
