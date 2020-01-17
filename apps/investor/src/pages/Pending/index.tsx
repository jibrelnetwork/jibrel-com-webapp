import React from 'react'
import { PageWithHero } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'
import heroImage from 'public/images/pic_hero_invest_process.svg'

const Pending: React.FunctionComponent = () => {
  const languageCode = useLanguageCode()

  return (
    <CoreLayout>
      <PageWithHero
        imgSrc={heroImage}
        href={`${settings.HOST_CMS}/${languageCode}`}
        buttonLabel='Back to startups'
        title='Account Verification Is in Progress'
        text='Your verification request is currently under review. We will notify you as soon as verification process is completed.'
      />
    </CoreLayout>
  )
}

export default Pending
