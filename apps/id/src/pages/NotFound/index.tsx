import React from 'react'
import { NotFound } from '@jibrelcom/ui'

import settings from 'app/settings'
import ProfileLayout from 'layouts/ProfileLayout'

const NotFoundEnhanced: React.FunctionComponent = () => (
  <ProfileLayout>
    <NotFound href={settings.HOST_CMS} />
  </ProfileLayout>
)

export default NotFoundEnhanced

