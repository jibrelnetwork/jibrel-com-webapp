import React from 'react'
import { connect } from 'react-redux'
import { Header } from '@jibrelcom/ui'
import { useRoute } from 'react-router5'
import { useLanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'

import {
  Dispatch,
  RootState,
} from 'store'

interface StateProps {
  isAuthenticated?: boolean;
}

interface DispatchProps {
  logout: () => void;
}

interface OwnProps {
  className?: string;
}

export type HeaderProps = StateProps & DispatchProps & OwnProps

const HeaderEnhanced: React.FunctionComponent<HeaderProps> = ({
  logout,
  isAuthenticated = false,
}) => {
  const { route } = useRoute()
  const languageCode = useLanguageCode()

  return (
    <Header
      logout={logout}
      lang={languageCode}
      activeRoute={route.name}
      domain={settings.FRONTEND_ROOT_DOMAIN_NAME}
      isAuthenticated={isAuthenticated}
    />
  )
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    isAuthenticated: !!state.user.status,
  }),
  (dispatch: Dispatch) => ({
    logout: dispatch.user.logout,
  })
)(HeaderEnhanced)
