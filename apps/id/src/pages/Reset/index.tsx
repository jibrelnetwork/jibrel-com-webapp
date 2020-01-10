import React, { Component } from 'react'
import cc from 'classcat'
import bigButtonStyle from '@jibrelcom/ui/src/BigButton/style.scss'
import { Link } from 'react-router5'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/languages'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  PasswordInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import authStyle from 'styles/auth.scss'
import AuthLayout from 'layouts/AuthLayout'

import { checkPasswordStrength } from 'utils/forms'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  ResponseLoader,
  UserActionInfo,
} from 'components'

import {
  isRequired,
  isMatchedPassword,
} from 'utils/validators'

import {
  FormSubmit,
  ResetPasswordFormFields,
} from 'store/types'

import style from './style.scss'

interface ResetProps {
  checkResetToken: (token: string) => Promise<void>;
  resetPassword: FormSubmit<ResetPasswordFormFields>;
  email: string;
  token: string;
}

interface ResetState {
  isChecking: boolean;
}

const ResetSuccess: React.FunctionComponent<{ email: string }> = ({
  email,
}) => {
  return (
    <UserActionInfo
      title='Password Updated'
      iconName='status_ok'
    >
      <p className={style.info}>
        Congratulations!<br />
        Password for <span className={style.email}>{email}</span> has been updated.
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

class Reset extends Component<ResetProps, ResetState> {
  constructor(props: ResetProps) {
    super(props)

    this.state = {
      isChecking: true,
    }
  }

  async componentDidMount(): Promise<void> {
    const {
      checkResetToken,
      token,
    } = this.props

    if (token) {
      await checkResetToken(token)

      this.setState({
        isChecking: false,
      })
    }
  }

  renderResetForm = ({
    handleSubmit,
    values,
    form: { getState },
    submitting: isSubmitting,
  }: FormRenderProps<ResetPasswordFormFields>): React.ReactNode => {
    const i18n = useI18n()
    const { submitSucceeded } = getState()

    if (this.state.isChecking) {
      return (
        <ResponseLoader>
          Wait a moment, please...
        </ResponseLoader>
      )
    }

    if (!isSubmitting && submitSucceeded) {
      return <ResetSuccess email={values.email} />
    }

    return (
      <form
        onSubmit={handleSubmit}
        className={authStyle.form}
      >
        <h2 className={authStyle.title}>Reset Password?</h2>
        <div className={authStyle.fields}>
          <PasswordInput
            validate={isRequired({ i18n })}
            checkPasswordStrength={checkPasswordStrength}
            name='password'
            label='New Password'
            maxLength={256}
            withIndicator
          />
          <PasswordInput
            validate={isMatchedPassword({ i18n })}
            name='passwordConfirm'
            label='Confirm Password'
            maxLength={256}
          />
        </div>
        <BigButtonSubmit>
          Update Password
        </BigButtonSubmit>
      </form>
    )
  }

  render(): React.ReactNode {
    const {
      resetPassword,
      email,
      token,
    } = this.props

    return (
      <AuthLayout>
        <div className={authStyle.main}>
          <Form
            onSubmit={resetPassword}
            render={this.renderResetForm}
            initialValues={{
              email,
              key: token,
              password: '',
              passwordConfirm: '',
            }}
          />
        </div>
      </AuthLayout>
    )
  }
}

export default connect(
  (state: RootState) => {
    const { profile } = state.user

    return {
      email: profile ? profile.userEmail : undefined,
    }
  },
  (dispatch: Dispatch) => ({
    resetPassword: dispatch.user.resetPassword,
    checkResetToken: dispatch.user.checkResetToken,
  })
)(Reset)
