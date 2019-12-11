import app from '../../app.scss'
import signup from './signup.scss'
import React from 'react'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Icon,
  Input,
  Checkbox,
  BigButtonSubmit,
  PhoneInput,
  LinkButton,
  Select,
  PasswordInput,
  CodeInput,
} from '@jibrelcom/ui'
import { checkPasswordStrength } from '../../utils/forms'
import CountrySelect from '../../components/CountrySelect'

interface SignupFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  terms: boolean;
}

const SIGNUP_INITIAL_VALUES: SignupFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  terms: false,
}

function renderSignupForm({
  handleSubmit,
  values,
  submitting: isSubmitting,
}: FormRenderProps<SignupFormFields>) {
  /* const {
    firstName,
    lastName,
    email,
    password,
  }: SignupFormFields = values */

  return (
    <form
      onSubmit={handleSubmit}
      className={app.form}
    >
      <h2 className={app.title}>Sign Up</h2>
      <div className={app.fields}>
        <Input
          className={app.field}
          name='firstName'
          label='First Name'
          hint='First message'
          maxLength={256}
        />
        <Select.Select
          name="select"
          label="foo"
          validate={(value: string): string | void => value === '2' ? 'NOT TWO!!!!!' : undefined}
        >
          <Select.Option value="1" label="1" />
          <Select.Option value="2" label="2" />
          <Select.Option value="3" label="3" />
          <Select.Option value="4" label="4" />
        </Select.Select>
        <CountrySelect
          name="country"
          label="Country"
        />
        <Input
          className={app.field}
          name='lastName'
          label='Last Name'
          success='Last message'
          maxLength={256}
        />
        <Input
          className={app.field}
          name='email'
          label='Email'
          hint='Email message'
          maxLength={256}
        />
        <Input
          className={app.field}
          name='password'
          label='Password'
          message='Password message'
          maxLength={256}
        />
        <PasswordInput
          onScoreChange={console.log}
          checkPasswordStrength={checkPasswordStrength}
          className={app.field}
          name='password'
          maxLength={256}
          withIndicator
        />
        <CodeInput
          className={app.field}
          name='code'
        />
        <PhoneInput
          ccc='+777'
          name='phone'
        />
      </div>
      <Checkbox
        className={app.field}
        name='terms'
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
        <Icon
          name='ic_arrow_down_24'
          className={signup.arrow}
        />
        <Icon
          namespace='id'
          name='ic_arrow_right_24'
          className={signup.arrow}
        />
        <Icon
          namespace='ui'
          name='ic_en_24'
        />
        <Icon
          namespace='id'
          name='ic_es_24'
        />
      </div>
    </form>
  )
}

export default function SignUp() {
  const handleSubmit = (values: SignupFormFields) => {
    return {
      firstName: 'firstName error',
      lastName: 'lastName error',
      email: 'email error',
      password: 'password error',
      code: 'code error',
      phone: 'phone error',
      terms: 'terms error',
    }
  }

  return (
    <div className={signup.main}>
      <Form
        onSubmit={handleSubmit}
        render={renderSignupForm}
        initialValues={SIGNUP_INITIAL_VALUES}
      />
    </div>
  )
}
