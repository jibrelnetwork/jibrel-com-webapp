import React from 'react'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  Checkbox,
  InternalLink,
  PasswordInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import auth from 'styles/auth.scss'
import settings from 'app/settings'
import AuthLayout from 'layouts/AuthLayout'
import { Dispatch } from 'store'
import { checkPasswordStrength } from 'utils/forms'

import {
  FormSubmit,
  SignUpFormFields,
} from 'store/types'

import {
  isRequired,
  isStrongPassword,
} from 'utils/validators'

import style from './style.scss'

const SIGNUP_INITIAL_VALUES: SignUpFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAgreedDocuments: false,
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
      className={auth.form}
    >
      <h2 className={auth.title}>Sign Up</h2>
      <div className={auth.fields}>
        <Input
          name='firstName'
          label='First Name'
          maxLength={30}
          validate={isRequired({ i18n })}
        />
        <Input
          name='lastName'
          label='Last Name'
          maxLength={30}
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
        name='isAgreedDocuments'
        validate={isRequired({ i18n })}
      >
        <span>
          I agree to Jibrel’s <a
            className={style.terms}
            href={`${settings.HOST_CMS}/docs/en/terms-and-conditions.pdf`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Terms and Conditions
          </a>, <a
            className={style.terms}
            href={`${settings.HOST_CMS}/docs/en/privacy-policy.pdf`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Privacy Policy
          </a> and <a
            className={style.terms}
            href={`${settings.HOST_CMS}/docs/en/risk-disclosures.pdf`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Risk Disclosures
          </a>.
        </span>
      </Checkbox>
      <BigButtonSubmit
        className={style.submit}
      >
        Create Account
      </BigButtonSubmit>
      <div className={style.signin}>
        <span>Already have a Jibrel account?</span>
        <InternalLink
          name='Login'
          className={style.action}
        >
          SIGN IN
        </InternalLink>
      </div>
    </form>
  )
}

interface SignUpProps {
  onSubmit: FormSubmit<SignUpFormFields>;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({
  onSubmit,
}) => {
  return (
    <AuthLayout>
      <div className={auth.main}>
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
