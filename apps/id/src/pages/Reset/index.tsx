import React, { Component } from 'react'
import cc from 'classcat'
import bigButtonStyle from '@jibrelcom/ui/src/BigButton/style.scss'
import { Link } from 'react-router5'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

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
import { Dispatch } from 'store'
import { checkPasswordStrength } from 'utils/forms'

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

interface DispatchProps {
  checkResetToken: (token: string) => Promise<void>;
  resetPassword: FormSubmit<ResetPasswordFormFields>;
}

interface OwnProps {
  email: string;
  token: string;
}

export type ResetProps = DispatchProps & OwnProps

interface ResetState {
  isChecking: boolean;
}

const ResetSuccess: React.FunctionComponent<{ email: string }> = ({
  email,
}) => {
  const i18n = useI18n()

  return (
    <UserActionInfo
      title={i18n._('Reset.success.title')}
      iconName='status_ok'
    >
      <p
        className={style.info}
        dangerouslySetInnerHTML={{
          __html: i18n._('Reset.success.message', { email })
        }}
      />
      <Link
        routeName='Login'
        routeParams={{ lang: 'en' }}
        className={cc([
          bigButtonStyle.button,
          bigButtonStyle.main,
        ])}
        id='t_login'
      >
        {i18n._('Reset.success.login')}
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
          {i18n._('Reset.wait')}
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
        <h2 className={authStyle.title}>{i18n._('Reset.form.title')}</h2>
        <div className={authStyle.fields}>
          <PasswordInput
            validate={isRequired({ i18n })}
            checkPasswordStrength={checkPasswordStrength}
            label={i18n._('Reset.form.password.label')}
            name='password'
            maxLength={256}
            withIndicator
          />
          <PasswordInput
            validate={isMatchedPassword({ i18n })}
            label={i18n._('Reset.form.passwordConfirm.label')}
            name='passwordConfirm'
            maxLength={256}
          />
        </div>
        <BigButtonSubmit>
          {i18n._('Reset.form.submit')}
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

export default connect<void, DispatchProps, OwnProps>(
  null,
  (dispatch: Dispatch) => ({
    resetPassword: dispatch.user.resetPassword,
    checkResetToken: dispatch.user.checkResetToken,
  })
)(Reset)
