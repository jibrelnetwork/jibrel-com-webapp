import React from 'react'
import { connect } from 'react-redux'
import { NotFound } from '@jibrelcom/ui'

import settings from 'app/settings'
import ProfileLayout from 'layouts/ProfileLayout'
import { Dispatch } from 'store'

export interface NotFoundProps {
  requestProfile: () => void;
}

const NotFoundEnhanced: React.FunctionComponent<NotFoundProps> = ({ requestProfile }) => (
  <ProfileLayout>
    <NotFound
      requestProfile={requestProfile}
      host={settings.HOST_CMS}
    />
  </ProfileLayout>
)

export default connect<null, NotFoundProps>(
  null,
  (dispatch: Dispatch) => ({
    requestProfile: dispatch.user.updateProfile,
  })
)(NotFoundEnhanced)
