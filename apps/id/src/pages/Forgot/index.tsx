import React from 'react'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  BigButton,
} from '@jibrelcom/ui'

import style from '../../styles/auth.scss'
import InternalLink from '../../components/InternalLink'

interface ForgotFormFields {
  email: string;
}

const FORGOT_INITIAL_VALUES: ForgotFormFields = {
  email: '',
}

const renderForgotForm: React.FunctionComponent = ({
  handleSubmit,
  values,
  submitting: isSubmitting,
}: FormRenderProps<ForgotFormFields>) => {
  const { email }: ForgotFormFields = values

  return (
    <form
      onSubmit={handleSubmit}
      className={style.form}
    >
      <h2 className={style.title}>Forgot Password?</h2>
      <div className={style.fields}>
        <Input
          className={style.field}
          name='email'
          label='Email'
          maxLength={256}
        />
      </div>
      <BigButton
        className={style.submit}
        type='submit'
        isLoading={isSubmitting}
        isDisabled={!email}
      >
        Reset Password
      </BigButton>
      <div className={style.switch}>
        <span>Already have an account?</span>
        <InternalLink
          name='Login'
          className={style.action}
        >
          SIGN IN
        </InternalLink>
      </div>
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

const Forgot: React.FunctionComponent = () => {
  const handleSubmit = (): ForgotFormFields => {
    return {
      email: 'email error',
    }
  }

  return (
    <div className={style.main}>
      <Form
        onSubmit={handleSubmit}
        render={renderForgotForm}
        initialValues={FORGOT_INITIAL_VALUES}
      />
    </div>
  )
}

export default Forgot
