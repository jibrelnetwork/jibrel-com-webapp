import React from 'react'
import { connect } from 'react-redux'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  Checkbox,
  PasswordInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import AuthLayout from 'layouts/AuthLayout'
import InternalLink from 'components/InternalLink'
import { Dispatch } from 'store'
import { useI18n } from 'app/i18n'
import { checkPasswordStrength } from 'utils/forms'

import {
  FormSubmit,
  SignUpFormValues,
} from 'store/types'

import {
  isRequired,
  isStrongPassword,
} from 'utils/validators'

import app from '../../app.scss'
import signup from './signup.scss'

const SIGNUP_INITIAL_VALUES: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false,
}

const handleChangeScore = (change: (
  name: string,
  value: number,
) => void) => (score: number): void => change('score', score)

const SignUpForm: React.FunctionComponent<FormRenderProps> = ({
  handleSubmit,
  values,
  form: { change },
}) => {
  const i18n = useI18n()

  return (
    <form
      onSubmit={handleSubmit}
      className={app.form}
    >
      <h2 className={app.title}>Sign Up</h2>
      <div className={app.fields}>
        <Input
          name='firstName'
          label='First Name'
          validate={isRequired({ i18n })}
        />
        <Input
          name='lastName'
          label='Last Name'
          validate={isRequired({ i18n })}
        />
        <Input
          name='email'
          label='Email'
          validate={isRequired({ i18n })}
        />
        <PasswordInput
          validate={isStrongPassword({ i18n })}
          onScoreChange={handleChangeScore(change)}
          checkPasswordStrength={checkPasswordStrength}
          userInputs={[
            values.email,
            values.lastName,
            values.firstName,
          ]}
          name='password'
          withIndicator
        />
      </div>
      <Checkbox
        name='terms'
        validate={isRequired({ i18n })}
      >
        <span>I agree to Jibrel's</span>
        <a
          href='#'
          className={signup.terms}
        >
          Terms and Conditions and Privacy Policy
        </a>
      </Checkbox>
      <BigButtonSubmit
        className={signup.submit}
      >
        Create Account
      </BigButtonSubmit>
      <div className={signup.signin}>
        <span>Already have a Jibrel account?</span>
        <InternalLink
          name='Login'
          className={signup.action}
        >
          SIGN IN
        </InternalLink>
      </div>
    </form>
  )
}

interface SignUpProps {
  onSubmit: FormSubmit<SignUpFormValues>;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({
  onSubmit,
}) => {
  return (
    <AuthLayout>
      <div className={signup.main}>
        <Form
          onSubmit={onSubmit}
          render={SignUpForm}
          initialValues={SIGNUP_INITIAL_VALUES}
        />
      </div>
    </AuthLayout>
  )
}

export default connect(
  null,
  (dispatch: Dispatch) => ({
    onSubmit: dispatch.user.signUp,
  })
)(SignUp)
