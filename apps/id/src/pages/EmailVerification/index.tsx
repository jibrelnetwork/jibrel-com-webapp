import React from 'react'
import { connect } from 'react-redux'
import { Loader } from '@jibrelcom/ui'
import { useI18n } from '@jibrelcom/i18n'

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

interface StateProps {
  email: string | void;
  resendVerificationEmail: UserLimit | void;
}

interface DispatchProps {
  updateLimits: () => Promise<void>;
  sendEmailLink: FormSubmit<EmailVerificationFormFields>;
}

export type EmailVerificationProps = StateProps & DispatchProps

interface EmailVerificationStatusProps {
  updateLimits: () => Promise<void>;
  timeLeft: number;
  isSubmitting: boolean;
  isSubmitError: boolean;
}

const EmailVerificationSending: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <div className={style.loading}>
      <div className={style.loader}>
        <Loader color={Loader.color.Blue} />
      </div>
      <span>{i18n._('EmailVerification.sending')}</span>
    </div>
  )
}

const EmailVerificationError: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <div className={style.error}>
      <span className={style.message}>
        {i18n._('EmailVerification.error.unable')}
      </span><br />
      <div
        dangerouslySetInnerHTML={{
          __html: i18n._('EmailVerification.error.check'),
        }}
      />
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
  const i18n = useI18n()

  return (
    <div className={style.countdown}>
      <div dangerouslySetInnerHTML={{
        __html: i18n._('EmailVerification.wait'),
      }} />
      <Countdown
        onFinish={updateLimits}
        timeLeft={timeLeft}
      />
    </div>
  )
}

const EmailVerificationSent: React.FunctionComponent = () => {
  const i18n = useI18n()

  return (
    <button
      type='submit'
      className={style.action}
    >
      {i18n._('EmailVerification.didntArrive')}
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

  const i18n = useI18n()

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
                  title={i18n._('EmailVerification.title')}
                  iconName='status_sent'
                >
                  <p
                    className={style.info}
                    dangerouslySetInnerHTML={{
                      __html: i18n._('EmailVerification.sent', { email })
                    }}
                  />
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

export default connect<StateProps, DispatchProps, void>(
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
