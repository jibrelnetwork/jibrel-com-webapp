import React from 'react'
import { PageWithHero } from '@jibrelcom/ui'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'
import heroImage from 'public/images/pic_hero_invest_process.svg'

const Unverified: React.FunctionComponent = () => (
  <CoreLayout>
    <PageWithHero
      imgSrc={heroImage}
      href={`//id.${settings.FRONTEND_ROOT_DOMAIN_NAME}/kyc`}
      buttonLabel='Verify Account'
      title='Your Account Is Unverified'
      text='You haven&lsquo;t verified your account yet. Please complete verification process to invest in startups and access other features for investors.'
    />
  </CoreLayout>
)

export default Unverified
