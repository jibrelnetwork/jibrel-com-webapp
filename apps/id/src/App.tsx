import React from 'react'

import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom'

import {
  Form,
  Field,
  FormRenderProps,
} from 'react-final-form'

import {
  Icon,
  Input,
  BigButton,
  LinkButton,
  Select,
} from '@jibrelcom/ui'

import app from './app.scss'
import signup from './signup.scss'

interface SignupFormFields {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const SIGNUP_INITIAL_VALUES: SignupFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export default function App() {
  return (
    <Router basename='/id'>
      <div className={app.app}>
        <Switch>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function Signin() {
  return <h2>Signin</h2>
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
        <Field
          component={Input}
          className={app.field}
          name='firstName'
          label='First Name'
          message='First message'
          maxLength={256}
        />
        <Select.SelectField
          name="select"
          title="foo"
          validate={(value: string): string | void => value === '2' ? 'NOT TWO!!!!!' : undefined}
        >
          <Select.Option value="1" title="1" />
          <Select.Option value="2" title="2" />
          <Select.Option value="3" title="3" />
          <Select.Option value="4" title="4" />
        </Select.SelectField>
        <Field
          component={Input}
          className={app.field}
          name='lastName'
          label='Last Name'
          message='Last message'
          messageType='success'
          maxLength={256}
        />
        <Field
          component={Input}
          className={app.field}
          name='email'
          label='Email'
          message='Email message'
          messageType='info'
          maxLength={256}
        />
        <Field
          component={Input}
          className={app.field}
          name='password'
          label='Password'
          message='Password message'
          messageType='error'
          maxLength={256}
        />
      </div>
      <label htmlFor='terms'>
        <input
          id='terms'
          type='checkbox'
        />
        <span>I agree to Jibrel's</span>
        <a
          href='#'
          className={signup.terms}
        >
          Terms and Conditions and Privacy Policy
        </a>
      </label>
      <BigButton
        className={signup.submit}
        type='submit'
        isLoading={isSubmitting}
      >
        Create Account
      </BigButton>
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

function Signup() {
  const handleSubmit = (values: SignupFormFields) => {
    console.log(values)

    return {
      firstName: 'firstName error',
      lastName: 'lastName error',
      email: 'email error',
      password: 'password error',
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
