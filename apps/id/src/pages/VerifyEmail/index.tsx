import React, { Component } from 'react'
import cc from 'classcat'
import bigButtonStyle from '@jibrelcom/ui/src/BigButton/style.scss'
import { Link } from 'react-router5'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import settings from 'app/settings'
import authStyle from 'styles/auth.scss'
import AuthLayout from 'layouts/AuthLayout'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  ResponseLoader,
  UserActionInfo,
} from 'components'

import style from './style.scss'

interface VerifyEmailProps {
  checkEmailToken: (token: string) => Promise<void>;
  token: string;
  email: string | void;
}

interface VerifyEmailState {
  isSubmitting: boolean;
  isSubmitError: boolean;
}

interface VerifyEmailInfoProps {
  email: string | void;
  isSubmitError: boolean;
}

const VerifyEmailInfo: React.FunctionComponent<VerifyEmailInfoProps> = ({
  email,
  isSubmitError,
}) => {
  const i18n = useI18n()

  return (
    <UserActionInfo
      iconName={`status_${isSubmitError ? 'fail' : 'ok'}`}
      title={i18n._(`VerifyEmail.title.${isSubmitError ? 'fail' : 'ok'}`)}
    >
      {(!isSubmitError && email) ? (
        <>
          <p
            className={style.info}
            dangerouslySetInnerHTML={{
              __html: i18n._('VerifyEmail.congratulations', { email }),
            }}
          />
          <Link
            routeName='VerifyPhone'
            className={cc([
              bigButtonStyle.button,
              bigButtonStyle.main,
            ])}
          >
            {i18n._('VerifyEmail.continue')}
          </Link>
        </>
      ) : (
        <div className={style.error}>
          <span className={style.message}>
            {i18n._('VerifyEmail.error.message')}
          </span>
          <a
            href={settings.CMS_ORIGIN}
            className={cc([
              style.close,
              bigButtonStyle.button,
              bigButtonStyle.main,
            ])}
          >
            {i18n._('VerifyEmail.error.close')}
          </a>
          <div
            className={style.support}
            dangerouslySetInnerHTML={{
              __html: i18n._('VerifyEmail.error.support')
            }}
          />
        </div>
      )}
    </UserActionInfo>
  )
}

const VerifyEmailLoader: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <ResponseLoader>
      {i18n._('VerifyEmail.wait')}
    </ResponseLoader>
  )
}

class VerifyEmail extends Component<VerifyEmailProps, VerifyEmailState> {
  constructor(props: VerifyEmailProps) {
    super(props)

    this.state = {
      isSubmitting: true,
      isSubmitError: false,
    }
  }

  async componentDidMount(): Promise<void> {
    const {
      checkEmailToken,
      token,
    } = this.props

    try {
      await checkEmailToken(token)

      this.setState({
        isSubmitting: false,
        isSubmitError: false,
      })
    } catch (error) {
      console.error(error)

      this.setState({
        isSubmitting: false,
        isSubmitError: true,
      })
    }
  }

  render(): React.ReactNode {
    const { email } = this.props

    const {
      isSubmitting,
      isSubmitError,
    } = this.state

    return (
      <AuthLayout>
        <div className={authStyle.main}>
          {(isSubmitting || !(email || isSubmitError)) ? (
            <VerifyEmailLoader />
          ) : (
            <VerifyEmailInfo
              email={email}
              isSubmitError={isSubmitError}
            />
          )}
        </div>
      </AuthLayout>
    )
  }
}

export default connect(
  (state: RootState) => {
    const { profile } = state.user

    return {
      email: profile ? profile.userEmail : undefined,
    }
  },
  (dispatch: Dispatch) => ({
    checkEmailToken: dispatch.user.checkEmailToken,
  })
)(VerifyEmail)
