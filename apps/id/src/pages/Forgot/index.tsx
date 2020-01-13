import React from 'react'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'
import { LoaderColor } from '@jibrelcom/ui/src/Loader/types'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  Loader,
  InternalLink,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import authStyle from 'styles/auth.scss'
import AuthLayout from 'layouts/AuthLayout'
import isRequired from 'utils/validators/isRequired'
import { Dispatch } from 'store'
import { UserActionInfo } from 'components'

import {
  FormSubmit,
  ForgotPasswordFormFields,
} from 'store/types'

import style from './style.scss'

interface ForgotProps {
  handleSubmit: FormSubmit<ForgotPasswordFormFields>;
}

const ForgotEmailSent: React.FunctionComponent = ({
  handleSubmit,
  values: { email },
  form: { getState },
  submitting: isSubmitting,
}: FormRenderProps<ForgotPasswordFormFields>) => {
  const { submitError } = getState()

  return (
    <form onSubmit={handleSubmit}>
      <UserActionInfo
        title='Email Sent'
        iconName='status_sent'
      >
        <p className={style.info}>
          We sent an email to <span className={style.email}>{email}</span>.<br />
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
            <span className={style.message}>
              We are unable to deliver email to your inbox.
            </span><br />
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

const ForgotForm: React.FunctionComponent = (props: FormRenderProps<ForgotPasswordFormFields>) => {
  const {
    handleSubmit,
    form: { getState },
    submitting: isSubmitting,
  } = props

  const {
    errors,
    submitError,
    submitSucceeded,
  } = getState()

  const i18n = useI18n()

  if (isSubmitting || submitSucceeded || (submitError && !errors.email)) {
    return <ForgotEmailSent {...props} />
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={authStyle.form}
    >
      <h2 className={authStyle.title}>Forgot Password?</h2>
      <div className={authStyle.fields}>
        <Input
          validate={isRequired({ i18n })}
          className={authStyle.field}
          name='email'
          label='Email'
          maxLength={256}
        />
      </div>
      <BigButtonSubmit className={authStyle.submit}>
        Reset Password
      </BigButtonSubmit>
      <div className={authStyle.switch}>
        <span>Already have an account?</span>
        <InternalLink
          name='Login'
          className={authStyle.action}
        >
          SIGN IN
        </InternalLink>
      </div>
      <div className={authStyle.switch}>
        <span>Don&apos;t have an account?</span>
        <InternalLink
          name='SignUp'
          className={authStyle.action}
        >
          SIGN UP
        </InternalLink>
      </div>
    </form>
  )
}

const Forgot: React.FunctionComponent<ForgotProps> = ({ handleSubmit }) => {
  return (
    <AuthLayout>
      <div className={authStyle.main}>
        <Form
          onSubmit={handleSubmit}
          render={ForgotForm}
          initialValues={{ email: '' }}
        />
      </div>
    </AuthLayout>
  )
}

export default connect(
  null,
  (dispatch: Dispatch) => ({
    handleSubmit: dispatch.user.sendForgotLink,
  })
)(Forgot)
