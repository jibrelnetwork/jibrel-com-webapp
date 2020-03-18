import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import { PageWithHero } from '@jibrelcom/ui'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'
import heroImage from 'public/images/pic_hero_rocket_sun.svg'

const Invested: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <CoreLayout>
      <PageWithHero
        imgSrc={heroImage}
        href={settings.CMS_ORIGIN}
        text={i18n._('Invested.text')}
        title={i18n._('Invested.title')}
        buttonLabel={i18n._('Invested.action.back')}
        secondaryButtonLabel={i18n._('Invested.action.support')}
        secondaryHref='mailto:invest@jibrel.com'
      />
    </CoreLayout>
  )
}

export default Invested
