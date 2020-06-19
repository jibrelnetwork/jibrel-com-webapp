import React from 'react'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  Input,
  Loader,
  InternalLink,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import authStyle from 'styles/auth.scss'
import AuthLayout from 'layouts/AuthLayout'
import isRequired from 'utils/validators/isRequired'
import { Dispatch } from 'store'
import { UserActionInfo } from 'components'

import {
  FormSubmit,
  ForgotPasswordFormFields,
} from 'store/types'

import style from './style.scss'

interface DispatchProps {
  handleSubmit: FormSubmit<ForgotPasswordFormFields>;
}

export type ForgotProps = DispatchProps

const ForgotEmailSent: React.FunctionComponent = ({
  handleSubmit,
  values: { email },
  form: { getState },
  submitting: isSubmitting,
}: FormRenderProps<ForgotPasswordFormFields>) => {
  const i18n = useI18n()
  const { submitError } = getState()

  return (
    <form onSubmit={handleSubmit}>
      <UserActionInfo
        title={i18n._('Forgot.title')}
        iconName='status_sent'
      >
        <p
          className={style.info}
          dangerouslySetInnerHTML={{
            __html: i18n._('Forgot.sent', { email })
          }}
        />
        {isSubmitting && (
          <div className={style.loading}>
            <div className={style.loader}>
              <Loader color={Loader.color.Blue} />
            </div>
            <span>{i18n._('Forgot.sending')}</span>
          </div>
        )}
        {!isSubmitting && submitError && (
          <div className={style.error}>
            <span className={style.message}>
              {i18n._('Forgot.error.unable')}
            </span><br />
            <div
              dangerouslySetInnerHTML={{
                __html: i18n._('Forgot.error.check'),
              }}
            />
          </div>
        )}
        {!isSubmitting && !submitError && (
          <button
            type='submit'
            className={style.action}
          >
            {i18n._('Forgot.didntArrive')}
          </button>
        )}
      </UserActionInfo>
    </form>
  )
}

const ForgotForm: React.FunctionComponent = (props: FormRenderProps<ForgotPasswordFormFields>) => {
  const {
    handleSubmit,
    form: { getState },
    submitting: isSubmitting,
  } = props

  const {
    errors,
    submitError,
    submitSucceeded,
  } = getState()

  const i18n = useI18n()

  if (isSubmitting || submitSucceeded || (submitError && !errors.email)) {
    return <ForgotEmailSent {...props} />
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={authStyle.form}
    >
      <h2 className={authStyle.title}>{i18n._('Forgot.form.title')}</h2>
      <div className={authStyle.fields}>
        <Input
          validate={isRequired({ i18n })}
          id='__forgotEmailField'
          className={authStyle.field}
          label={i18n._('Forgot.form.email.label')}
          name='email'
          maxLength={256}
        />
      </div>
      <BigButtonSubmit className={authStyle.submit}
        id='__resetPassButton'>
        {i18n._('Forgot.form.submit')}
      </BigButtonSubmit>
      <div className={authStyle.switch}>
        <span>{i18n._('Forgot.alreadyHaveAccount')}</span>
        <InternalLink
          name='Login'
          className={authStyle.action}
        >
          {i18n._('Forgot.signin')}
        </InternalLink>
      </div>
      <div className={authStyle.switch}>
        <span>{i18n._('Forgot.dontHaveAccount')}</span>
        <InternalLink
          name='SignUp'
          className={authStyle.action}
        >
          {i18n._('Forgot.signup')}
        </InternalLink>
      </div>
    </form>
  )
}

const Forgot: React.FunctionComponent<ForgotProps> = ({ handleSubmit }) => {
  return (
    <AuthLayout>
      <div className={authStyle.main}>
        <Form
          onSubmit={handleSubmit}
          render={ForgotForm}
          initialValues={{ email: '' }}
        />
      </div>
    </AuthLayout>
  )
}

export default connect<void, DispatchProps, void>(
  null,
  (dispatch: Dispatch) => ({
    handleSubmit: dispatch.user.sendForgotLink,
  })
)(Forgot)
