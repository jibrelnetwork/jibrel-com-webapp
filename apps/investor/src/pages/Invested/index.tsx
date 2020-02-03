import React from 'react'
import { PageWithHero } from '@jibrelcom/ui'

import settings from 'app/settings'
import CoreLayout from 'layouts/CoreLayout'
import heroImage from 'public/images/pic_hero_rocket_sun.svg'

const Invested: React.FunctionComponent = () => (
  <CoreLayout>
    <PageWithHero
      imgSrc={heroImage}
      href={settings.HOST_CMS}
      buttonLabel='Back to startups'
      title='You have Successfully Subscribed'
      secondaryButtonLabel='Contact support'
      secondaryHref='mailto:invest@jibrel.com'
      text='If you want to change the subscription amount or cancel the subscription, please, contact our Support team.'
    />
  </CoreLayout>
)

export default Invested
