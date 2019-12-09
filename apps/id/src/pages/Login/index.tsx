import React from 'react'
import cc from 'classcat'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  BigButton,
  PasswordInput,
} from '@jibrelcom/ui'

import style from '../../styles/auth.scss'
import InternalLink from '../../components/InternalLink'

interface LoginFormFields {
  email: string;
  password: string;
}

const LOGIN_INITIAL_VALUES: LoginFormFields = {
  email: '',
  password: '',
}

const renderLoginForm: React.FunctionComponent = ({
  handleSubmit,
  values,
  submitting: isSubmitting,
}: FormRenderProps<LoginFormFields>) => {
  const {
    email,
    password,
  }: LoginFormFields = values

  return (
    <form
      onSubmit={handleSubmit}
      className={style.form}
    >
      <h2 className={style.title}>Sign In</h2>
      <div className={style.fields}>
        <Input
          className={style.field}
          name='email'
          label='Email'
          maxLength={256}
        />
        <PasswordInput
          className={style.field}
          name='password'
          maxLength={256}
        />
      </div>
      <BigButton
        className={style.submit}
        type='submit'
        isLoading={isSubmitting}
        isDisabled={!(email && password)}
      >
        Sign In
      </BigButton>
      <InternalLink
        to='/forgot'
        className={cc([style.action, style.wide])}
      >
        FORGOT PASSWORD?
      </InternalLink>
      <div className={style.switch}>
        <span>Don&apos;t have an account?</span>
        <InternalLink
          to='/signup'
          className={style.action}
        >
          SIGN UP
        </InternalLink>
      </div>
    </form>
  )
}

const Login: React.FunctionComponent = () => {
  const handleSubmit = (): LoginFormFields => {
    return {
      email: 'email error',
      password: 'password error',
    }
  }

  return (
    <div className={style.main}>
      <Form
        onSubmit={handleSubmit}
        render={renderLoginForm}
        initialValues={LOGIN_INITIAL_VALUES}
      />
    </div>
  )
}

export default Login
