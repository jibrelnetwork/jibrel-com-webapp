import React, { Component } from 'react'
import cc from 'classcat'
import bigButtonStyle from '@jibrelcom/ui/src/BigButton/style.scss'
import { Link } from 'react-router5'
import { connect } from 'react-redux'

import style from './style.scss'
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
}) => (
  <UserActionInfo
    iconName={`status_${isSubmitError ? 'fail' : 'ok'}`}
    title={isSubmitError ? 'Email Is Not Verified' : 'Email Is Verified'}
  >
    {(!isSubmitError && email) ? (
      <>
        <p className={style.info}>
          Congratulations!<br />
          Your email <span className={style.email}>{email}</span> is verified.
        </p>
        <Link
          routeName='VerifyPhone'
          className={cc([
            bigButtonStyle.button,
            bigButtonStyle.main,
          ])}
        >
          Сontinue
        </Link>
      </>
    ) : (
      <div className={style.error}>
        <span className={style.message}>
          The attempt to verify your email failed.
        </span>
        <a
          href='/'
          className={cc([
            style.close,
            bigButtonStyle.button,
            bigButtonStyle.main,
          ])}
        >
          Close
        </a>
        <span>If you have any questions, please get in touch with our </span>
        <a className={style.support} href='#'>Support team.</a>
      </div>
    )}
  </UserActionInfo>
)

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
            <ResponseLoader>
              Wait a moment, please...
            </ResponseLoader>
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
