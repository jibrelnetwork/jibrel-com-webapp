import React from 'react'
import { connect } from 'react-redux'
import { NotFound } from '@jibrelcom/ui'

import settings from 'app/settings'
import { Dispatch } from 'store'

export interface NotFoundProps {
  requestProfile: () => void;
}

const NotFoundEnhanced: React.FunctionComponent<NotFoundProps> = ({ requestProfile }) => (
  <NotFound
    requestProfile={requestProfile}
    host={settings.HOST_CMS}
  />
)

export default connect<null, NotFoundProps>(
  null,
  (dispatch: Dispatch) => ({
    requestProfile: dispatch.user.updateProfile,
  })
)(NotFoundEnhanced)
