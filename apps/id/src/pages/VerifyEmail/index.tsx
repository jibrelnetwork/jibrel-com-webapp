import React, { Component } from 'react'
import cc from 'classcat'
import bigButtonStyle from '@jibrelcom/ui/src/BigButton/style.scss'
import { Link } from 'react-router5'

import style from './style.scss'
import authStyle from '../../styles/auth.scss'
import AuthLayout from '../../layouts/AuthLayout'
import UserActionInfo from '../../components/UserActionInfo'

interface VerifyEmailProps {
  token: string;
}

interface VerifyEmailState {
  email: string | null;
  isSubmitting: boolean;
}

class VerifyEmail extends Component<VerifyEmailProps, VerifyEmailState> {
  constructor(props: VerifyEmailProps) {
    super(props)

    this.state = {
      email: null,
      isSubmitting: true,
    }
  }

  async componentDidMount(): Promise<void> {
    console.log(this.props.token)

    const {
      email,
      isSubmitting,
    } = this.state

    if (!email && isSubmitting) {
      this.setState({
        email: await new Promise((resolve) => {
          setTimeout(() => resolve('foo@bar.com'), 1000)
        }),
        isSubmitting: false,
      })
    }
  }

  render(): React.ReactNode {
    const {
      email,
      isSubmitting,
    } = this.state

    if (isSubmitting) {
      return null
    }

    return (
      <AuthLayout>
        <div className={authStyle.main}>
          <UserActionInfo
            iconName={`status_${email ? 'ok' : 'fail'}`}
            title={email ? 'Email Is Verified' : 'Email Is Not Verified'}
          >
            {email ? (
              <>
                <p className={style.info}>
                  Congratulations!<br />
                  Your email <span className={style.email}>{email}</span> is verified.
                </p>
                <Link
                  routeName='Login'
                  routeParams={{ lang: 'en' }}
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
                <span>If you have any questions, please get in touch with our </span><br />
                <a className={style.support} href='#'>Support team.</a>
              </div>
            )}
          </UserActionInfo>
        </div>
      </AuthLayout>
    )
  }
}

export default VerifyEmail
