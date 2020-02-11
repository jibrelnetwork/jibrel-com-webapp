import React from 'react'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'
import axiosRetry from 'axios-retry'

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
import { axios, Dispatch} from 'store'
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
  React.useEffect(() => {
     axios
      .get(
        '/v1/user/profile',
        {
          'axios-retry': {
            retries: Infinity,
            retryDelay: () => 1000,
            retryCondition: (x) => {
              console.log({...x})

              return true
            }
          }
        })
  }, [])

  const i18n = useI18n()

  return (
    <form
      onSubmit={handleSubmit}
      className={auth.form}
    >
      <h2 className={auth.title}>{i18n._('Signup.form.title')}</h2>
      <div className={auth.fields}>
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('Signup.form.firstName.label')}
          name='firstName'
          maxLength={30}
        />
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('Signup.form.lastName.label')}
          name='lastName'
          maxLength={30}
        />
        <Input
          validate={isRequired({ i18n })}
          label={i18n._('Signup.form.email.label')}
          name='email'
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
        validate={isRequired({ i18n })}
        name='isAgreedDocuments'
      >
        <span
          className={style.terms}
          dangerouslySetInnerHTML={{
            __html: i18n._('Signup.form.terms', { host: settings.HOST_CMS }),
          }}
        />
      </Checkbox>
      <BigButtonSubmit className={style.submit}>
        {i18n._('Signup.form.submit')}
      </BigButtonSubmit>
      <div className={style.signin}>
        <span>{i18n._('Signup.alreadyHaveAccount')}</span>
        <InternalLink
          name='Login'
          className={style.action}
        >
          {i18n._('Signup.signin')}
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
