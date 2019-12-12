import React, { Component } from 'react'
import cc from 'classcat'
import bigButtonStyle from '@jibrelcom/ui/src/BigButton/style.scss'
import { Link } from 'react-router5'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  BigButton,
  PasswordInput,
} from '@jibrelcom/ui'

import style from './style.scss'
import authStyle from '../../styles/auth.scss'
import { UserActionInfo } from '../../components'

interface ResetFormFields {
  password: string;
  passwordConfirm: string;
}

interface ResetFormErrors {
  password?: string;
  passwordConfirm?: string;
}

interface ResetProps {
  handleSubmit: (values: ResetFormFields) => Promise<ResetFormErrors | string>;
}

interface ResetState {
  email?: string;
}

const RESET_INITIAL_VALUES: ResetFormFields = {
  password: '',
  passwordConfirm: '',
}

class Reset extends Component<ResetProps, ResetState> {
  constructor(props: ResetProps) {
    super(props)

    this.state = {
      email: undefined,
    }
  }

  handleSubmit = async (values: ResetFormFields): Promise<ResetFormErrors | string> => {
    const result: ResetFormErrors | string = await new Promise((resolve) => {
      setTimeout(() => resolve('qwe'), 5000)
    })

    if (typeof result === 'string') {
      this.setState({ email: result })

      return {}
    }

    return result
  }

  renderResetSuccess = (): React.ReactNode => {
    return (
      <UserActionInfo
        title='Password Updated'
        iconName='status_ok'
      >
        <p className={style.info}>
          Congratulations!<br />
          Password for <span className={style.email}>{this.state.email}</span> has been updated.
        </p>
        <Link
          routeName='Login'
          routeParams={{ lang: 'en' }}
          className={cc([
            bigButtonStyle.button,
            bigButtonStyle.main,
          ])}
        >
          Log In to jibrel
        </Link>
      </UserActionInfo>
    )
  }

  renderResetForm = ({
    handleSubmit,
    values: {
      password,
      passwordConfirm,
    },
    submitting: isSubmitting,
  }: FormRenderProps<ResetFormFields>): React.ReactNode => {
    const isSubmitted = !!this.state.email

    if (!isSubmitting && isSubmitted) {
      return this.renderResetSuccess()
    }

    return (
      <form
        onSubmit={handleSubmit}
        className={authStyle.form}
      >
        <h2 className={authStyle.title}>Reset Password?</h2>
        <div className={authStyle.fields}>
          <PasswordInput
            onScoreChange={console.log}
            checkPasswordStrength={console.log}
            name='password'
            label='New Password'
            maxLength={256}
            withIndicator
          />
          <PasswordInput
            name='passwordConfirm'
            label='Confirm Password'
            maxLength={256}
          />
        </div>
        <BigButton
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!(password && passwordConfirm)}
        >
          Update Password
        </BigButton>
      </form>
    )
  }

  render(): React.ReactNode {
    return (
      <div className={authStyle.main}>
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderResetForm}
          initialValues={RESET_INITIAL_VALUES}
        />
      </div>
    )
  }
}

export default Reset
