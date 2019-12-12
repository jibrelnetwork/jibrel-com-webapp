import React, { Component } from 'react'
import { FORM_ERROR } from 'final-form'
import { Loader } from '@jibrelcom/ui'
import { LoaderColor } from '@jibrelcom/ui/src/Loader/types'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import style from './style.scss'
import authStyle from '../../styles/auth.scss'
import AuthLayout from '../../layouts/AuthLayout'
import UserActionInfo from '../../components/UserActionInfo'

interface EmailVerificationErrors {
  [FORM_ERROR]?: string;
}

interface EmailVerificationProps {
  handleSubmit: () => Promise<EmailVerificationErrors>;
  email: string;
}

class EmailVerification extends Component<EmailVerificationProps> {
  handleSubmit = async (): Promise<EmailVerificationErrors> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ [FORM_ERROR]: 'Unable to deliver' }), 5000)
    })
  }

  renderEmailVerification = ({
    handleSubmit,
    form: { getState },
    submitting: isSubmitting,
  }: FormRenderProps): React.ReactNode => {
    const { submitError } = getState()

    return (
      <form onSubmit={handleSubmit}>
        <UserActionInfo
          title='Verify Your Email'
          iconName='status_sent'
        >
          <p className={style.info}>
            We&apos;ve sent a verification email to <span className={style.email}>
              {this.props.email}
            </span>.<br />
            Click the link inside to get started.
          </p>
          {isSubmitting && (
            <div className={style.loading}>
              <div className={style.loader}>
                <Loader color={LoaderColor.blue} />
              </div>
              <span>We are sending a new email. Please check your inbox.</span>
            </div>
          )}
          {!isSubmitting && submitError && (
            <div className={style.error}>
              <span className={style.message}>{submitError}</span><br />
              <span>Please check your spam folder or contact our</span><br />
              <a className={style.support} href='#'>Support team.</a>
            </div>
          )}
          {!isSubmitting && !submitError && (
            <button
              type='submit'
              className={style.action}
            >
              EMAIL DIDN&apos;T ARRIVE?
            </button>
          )}
        </UserActionInfo>
      </form>
    )
  }

  render(): React.ReactNode {
    return (
      <AuthLayout>
        <div className={authStyle.main}>
          <Form
            onSubmit={this.handleSubmit}
            render={this.renderEmailVerification}
          />
        </div>
      </AuthLayout>
    )
  }
}

export default EmailVerification
