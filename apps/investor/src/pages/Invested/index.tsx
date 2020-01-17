import React from 'react'
import { PageWithHero } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'
import heroImage from 'public/images/pic_hero_invest_process.svg'

export interface InvestedProps {
  slug: string;
}

const Invested: React.FunctionComponent<InvestedProps> = ({ slug }) => {
  const languageCode = useLanguageCode()

  return (
    <CoreLayout>
      <PageWithHero
        imgSrc={heroImage}
        href={`${settings.HOST_CMS}/${languageCode}/companies/${slug}`}
        buttonLabel='Back to startups'
        title='You Have Invested Already'
        secondaryButtonLabel='Write to Support'
        secondaryHref='mailto:support@jibrel.com'
        text='If you want to change the subscription amount or cancel the subscription, please, contact our Support team.'
      />
    </CoreLayout>
  )
}

export default Invested
