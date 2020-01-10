import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/languages'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  PasswordInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import style from 'styles/auth.scss'
import AuthLayout from 'layouts/AuthLayout'
import InternalLink from 'components/InternalLink'
import isRequired from 'utils/validators/isRequired'
import { Dispatch } from 'store'

import {
  FormSubmit,
  LoginFormFields,
} from 'store/types'

const LOGIN_INITIAL_VALUES: LoginFormFields = {
  email: '',
  password: '',
}

const LoginForm: React.FunctionComponent = ({
  handleSubmit,
  form: { getState },
}: FormRenderProps<LoginFormFields>) => {
  const i18n = useI18n()
  const { submitError } = getState()

  return (
    <form
      onSubmit={handleSubmit}
      className={style.form}
    >
      <h2 className={style.title}>Sign In</h2>
      <div className={style.fields}>
        <Input
          validate={isRequired({ i18n })}
          className={style.field}
          name='email'
          label='Email'
          maxLength={256}
        />
        <PasswordInput
          validate={isRequired({ i18n })}
          className={style.field}
          name='password'
          maxLength={256}
        />
      </div>
      {!!submitError && <div className={style.error}>{submitError}</div>}
      <BigButtonSubmit className={style.submit}>
        Sign In
      </BigButtonSubmit>
      <InternalLink
        name='Forgot'
        className={cc([style.action, style.wide])}
      >
        FORGOT PASSWORD?
      </InternalLink>
      <div className={style.switch}>
        <span>Don&apos;t have an account?</span>
        <InternalLink
          name='SignUp'
          className={style.action}
        >
          SIGN UP
        </InternalLink>
      </div>
    </form>
  )
}

interface LoginProps {
  handleSubmit: FormSubmit<LoginFormFields>;
}

const Login: React.FunctionComponent<LoginProps> = ({
  handleSubmit,
}) => {
  return (
    <AuthLayout>
      <div className={style.main}>
        <Form
          onSubmit={handleSubmit}
          render={LoginForm}
          initialValues={LOGIN_INITIAL_VALUES}
        />
      </div>
    </AuthLayout>
  )
}

export default connect(
  null,
  (dispatch: Dispatch) => ({
    handleSubmit: dispatch.user.login,
  })
)(Login)
