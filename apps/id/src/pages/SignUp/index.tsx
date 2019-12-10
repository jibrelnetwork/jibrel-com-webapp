import app from '../../app.scss'
import signup from './signup.scss'
import React from 'react'
import { connect } from 'react-redux'
import mapValues from 'lodash-es/mapValues'
import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  Checkbox,
  BigButtonSubmit,
  LinkButton,
  PasswordInput,
} from '@jibrelcom/ui'
import { checkPasswordStrength } from 'utils/forms'
import {
  axios,
  Dispatch,
  RootState,
} from 'store'
import { Profile } from 'store/types'
import isRequired from 'utils/validators/isRequired'
import { useI18n } from 'app/i18n'
import { LanguageCode } from 'data/languages'
import { AxiosError, AxiosResponse } from 'axios'

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

type SignUpFormErrors = {
  [key in keyof SignUpFormValues]?: string | void;
}

const SIGNUP_INITIAL_VALUES: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false,
}

const SignUpForm: React.FunctionComponent<FormRenderProps> = ({
  handleSubmit,
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
          onScoreChange={console.log}
          checkPasswordStrength={checkPasswordStrength}
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
        <LinkButton
          href='/signin'
          className={signup.action}
        >
          SIGN IN
        </LinkButton>
      </div>
    </form>
  )
}

interface SignUpProps {
  language: LanguageCode;
  onSubmitSuccess: (profile: Profile) => void;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({
  language,
  onSubmitSuccess,
}) => {
  const handleSubmit = ({
    firstName,
    lastName,
    email,
    password,
    terms,
  }: SignUpFormValues): Promise<SignUpFormErrors | undefined | void> => {
    return axios
      .post('/v1/auth/registration', {
        userName: `${firstName} ${lastName}`,
        email,
        password,
        language,
        isAgreedTerms: terms,
        isAgreedPrivacyPolicy: terms,
      })
      .then((result: AxiosResponse<{ data: Profile }>) => {
        onSubmitSuccess(result.data.data)
        console.log(result)
      })
      .catch((error: AxiosError) => {
        if (!error.response) {
          throw error
        }

        const { status, data } = error.response
        if (status === 400) {
          return mapValues(data.errors, (e) => e[0].message)
        }

        throw error
      })
  }

  return (
    <div className={signup.main}>
      <Form
        onSubmit={handleSubmit}
        render={SignUpForm}
        initialValues={SIGNUP_INITIAL_VALUES}
      />
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    language: state.user.languageCode,
  }),
  (dispatch: Dispatch) => ({
    onSubmitSuccess: (profile: Profile): void => {
      dispatch.user.setProfile(profile)
    }
  })
)(SignUp)
