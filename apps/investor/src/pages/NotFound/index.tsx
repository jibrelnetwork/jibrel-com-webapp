import React from 'react'
import { NotFound } from '@jibrelcom/ui'

import settings from 'app/settings'

const NotFoundEnhanced: React.FunctionComponent = () => (
  <NotFound href={settings.HOST_CMS} />
)

export default NotFoundEnhanced
