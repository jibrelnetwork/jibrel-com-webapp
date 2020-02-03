import React from 'react'
import { connect } from 'react-redux'
import { Loader } from '@jibrelcom/ui'
import { LoaderColor } from '@jibrelcom/ui/src/Loader/types'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import authStyle from 'styles/auth.scss'
import AuthLayout from 'layouts/AuthLayout'

import {
  Countdown,
  UserActionInfo,
} from 'components'

import {
  UserLimit,
  FormSubmit,
  EmailVerificationFormFields,
} from 'store/types'

import {
  Dispatch,
  RootState,
} from 'store'

import style from './style.scss'

interface EmailVerificationProps {
  updateLimits: () => Promise<void>;
  sendEmailLink: FormSubmit<EmailVerificationFormFields>;
  email: string | void;
  resendVerificationEmail: UserLimit | void;
}

interface EmailVerificationStatusProps {
  updateLimits: () => Promise<void>;
  timeLeft: number;
  isSubmitting: boolean;
  isSubmitError: boolean;
}

const EmailVerificationSending: React.FunctionComponent = () => {
  return (
    <div className={style.loading}>
      <div className={style.loader}>
        <Loader color={LoaderColor.blue} />
      </div>
      <span>We are sending a new email. Please check your inbox.</span>
    </div>
  )
}

const EmailVerificationError: React.FunctionComponent = () => {
  return (
    <div className={style.error}>
      <span className={style.message}>
        We are unable to deliver email to your inbox.
      </span><br />
      <span>Please check your spam folder or contact our</span><br />
      <a className={style.support} href='#'>Support team.</a>
    </div>
  )
}

const EmailVerificationWait: React.FunctionComponent<{
  updateLimits: () => Promise<void>;
  timeLeft: number;
}> = ({
  updateLimits,
  timeLeft,
}) => {
  return (
    <div className={style.countdown}>
      Email sent. Please check your inbox.<br />
      You can request the email again in
      <Countdown
        onFinish={updateLimits}
        timeLeft={timeLeft}
      />
    </div>
  )
}

const EmailVerificationSent: React.FunctionComponent = () => {
  return (
    <button
      type='submit'
      className={style.action}
    >
      EMAIL DIDN&apos;T ARRIVE?
    </button>
  )
}

const EmailVerificationStatus: React.FunctionComponent<EmailVerificationStatusProps> = ({
  updateLimits,
  timeLeft,
  isSubmitting,
  isSubmitError,
}) => {
  if (isSubmitting) {
    return <EmailVerificationSending />
  } else if (isSubmitError) {
    return <EmailVerificationError />
  } else if (timeLeft) {
    return <EmailVerificationWait updateLimits={updateLimits} timeLeft={timeLeft} />
  } else {
    return <EmailVerificationSent />
  }
}

const EmailVerification: React.FunctionComponent<EmailVerificationProps> = ({
  updateLimits,
  sendEmailLink,
  email,
  resendVerificationEmail,
}: EmailVerificationProps) => {
  if (!(email && resendVerificationEmail)) {
    return null
  }

  const {
    leftSeconds,
    temproraryUnavailable,
  } = resendVerificationEmail

  return (
    <AuthLayout>
      <div className={authStyle.main}>
        <Form
          onSubmit={sendEmailLink}
          render={({
            handleSubmit,
            values: { email },
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
                      {email}
                    </span>.<br />
                    Click the link inside to get started.
                  </p>
                  <EmailVerificationStatus
                    updateLimits={updateLimits}
                    timeLeft={leftSeconds}
                    isSubmitting={isSubmitting}
                    isSubmitError={!!submitError || temproraryUnavailable}
                  />
                </UserActionInfo>
              </form>
            )
          }}
          initialValues={{ email }}
        />
      </div>
    </AuthLayout>
  )
}

export default connect(
  (state: RootState) => {
    const {
      limits,
      profile,
    } = state.user

    return {
      email: profile ? profile.userEmail : undefined,
      resendVerificationEmail: limits ? limits.resendVerificationEmail : undefined,
    }
  },
  (dispatch: Dispatch) => ({
    updateLimits: dispatch.user.updateLimits,
    sendEmailLink: dispatch.user.sendEmailLink,
  })
)(EmailVerification)
