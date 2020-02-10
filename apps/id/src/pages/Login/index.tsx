import React from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  InternalLink,
  PasswordInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import style from 'styles/auth.scss'
import AuthLayout from 'layouts/AuthLayout'
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

interface DispatchProps {
  handleSubmit: FormSubmit<LoginFormFields>;
}

export type LoginProps = DispatchProps

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
      <h2 className={style.title}>{i18n._('Login.form.title')}</h2>
      <div className={style.fields}>
        <Input
          validate={isRequired({ i18n })}
          className={style.field}
          label={i18n._('Login.form.email.label')}
          name='email'
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
        {i18n._('Login.form.submit')}
      </BigButtonSubmit>
      <InternalLink
        name='Forgot'
        className={cc([style.action, style.wide])}
      >
        {i18n._('Login.forgot')}
      </InternalLink>
      <div className={style.switch}>
        <span>{i18n._('Login.dontHaveAccount')}</span>
        <InternalLink
          name='SignUp'
          className={style.action}
        >
          {i18n._('Login.signup')}
        </InternalLink>
      </div>
    </form>
  )
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

export default connect<void, DispatchProps, void>(
  null,
  (dispatch: Dispatch) => ({
    handleSubmit: dispatch.user.login,
  })
)(Login)
