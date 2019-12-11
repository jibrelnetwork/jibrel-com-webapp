import React, { Component } from 'react'
import { FORM_ERROR } from 'final-form'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  BigButton,
} from '@jibrelcom/ui'

import style from './style.scss'
import authStyle from '../../styles/auth.scss'
import AuthLayout from '../../layouts/AuthLayout'

import {
  InternalLink,
  UserActionInfo,
} from '../../components'

interface ForgotFormFields {
  email: string;
}

interface ForgotFormErrors {
  email?: string;
  [FORM_ERROR]?: string;
}

interface ForgotProps {
  handleSubmit: (values: ForgotFormFields) => Promise<ForgotFormErrors>;
}

const FORGOT_INITIAL_VALUES: ForgotFormFields = {
  email: '',
}

class Forgot extends Component<ForgotProps> {
  constructor(props: ForgotProps) {
    super(props)

    this.state = {
      errors: undefined,
    }
  }

  handleSubmit = async (values: ForgotFormFields): Promise<ForgotFormErrors> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ [FORM_ERROR]: 'Unable to deliver' }), 5000)
    })
  }

  renderForgotEmailSent = ({
    handleSubmit,
    values: { email },
    form: { getState },
    submitting: isSubmitting,
  }: FormRenderProps<ForgotFormFields>): React.ReactNode => {
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
              <span className={style.loader}>...</span>
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

  renderForgotForm = (props: FormRenderProps<ForgotFormFields>): React.ReactNode => {
    const {
      handleSubmit,
      values: { email },
      form: { getState },
      submitting: isSubmitting,
    } = props

    const {
      submitError,
      errors: {
        email: emailError,
      },
    } = getState()

    if (isSubmitting || (submitError && !emailError)) {
      return this.renderForgotEmailSent(props)
    }

    return (
      <form
        onSubmit={handleSubmit}
        className={authStyle.form}
      >
        <h2 className={authStyle.title}>Forgot Password?</h2>
        <div className={authStyle.fields}>
          <Input
            className={authStyle.field}
            name='email'
            label='Email'
            maxLength={256}
          />
        </div>
        <BigButton
          className={authStyle.submit}
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!email}
        >
          Reset Password
        </BigButton>
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

  render(): React.ReactNode {
    return (
      <AuthLayout>
        <div className={authStyle.main}>
          <Form
            onSubmit={this.handleSubmit}
            render={this.renderForgotForm}
            initialValues={FORGOT_INITIAL_VALUES}
          />
        </div>
      </AuthLayout>
    )
  }
}

export default Forgot
