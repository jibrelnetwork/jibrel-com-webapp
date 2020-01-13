import React from 'react'
import { connect } from 'react-redux'
import { Header } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'
import { UserStatus } from 'store/types'

import {
  Dispatch,
  RootState,
} from 'store'

export interface HeaderProps {
  logout?: () => void;
  className?: string;
  isAuthenticated?: boolean;
}

const HeaderEnhanced: React.FunctionComponent<HeaderProps> = ({
  logout = undefined,
  isAuthenticated = false,
}) => {
  const languageCode = useLanguageCode()

  return (
    <Header
      logout={logout}
      cmsURL={settings.HOST_CMS}
      languageCode={languageCode}
      isAuthenticated={isAuthenticated}
    />
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: state.user.status ? (state.user.status !== UserStatus.ANONYMOUS) : false,
  }),
  (dispatch: Dispatch) => ({
    logout: dispatch.user.logout,
  })
)(HeaderEnhanced)
