import React, { Component } from 'react'
import cc from 'classcat'
import { FORM_ERROR } from 'final-form'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import {
  BigButton,
  CodeInput,
  LinkButton,
} from '@jibrelcom/ui'

import style from './style.scss'
import authStyle from '../../../styles/auth.scss'
import InternalLink from '../../../components/InternalLink'

interface VerifyPhoneCodeFormFields {
  code: string;
}

interface VerifyPhoneCodeFormErrors {
  code?: string;
  [FORM_ERROR]?: string;
}

interface VerifyPhoneCodeProps {
  handleSubmit: (values: VerifyPhoneCodeFormFields) => Promise<VerifyPhoneCodeFormErrors>;
}

interface VerifyPhoneCodeState {
  phone: string;
  countdown: number;
  isLoading: boolean;
}

const ONE_MINUTE = 60
const ONE_SECOND = 1000

const RESET_INITIAL_VALUES: VerifyPhoneCodeFormFields = {
  code: '',
}

class VerifyPhoneCode extends Component<VerifyPhoneCodeProps, VerifyPhoneCodeState> {
  constructor(props: VerifyPhoneCodeProps) {
    super(props)

    this.state = {
      phone: '',
      countdown: 0,
      isLoading: true,
    }
  }

  async componentDidMount(): Promise<void> {
    await this.requestPhoneStatus()
  }

  requestPhoneStatus = async (): Promise<void> => {
    this.setState({
      isLoading: true,
    })

    return new Promise((resolve) => {
      setTimeout(() => {
        const now = Date.now()
        const nowPlusMinute = now + 70 * ONE_SECOND
        const sentAt = new Date(/* should be data from request */now)
        const diff = (nowPlusMinute - sentAt.getTime()) / ONE_SECOND
        const countdown = (diff > 0) ? diff : 0

        this.setState({
          countdown,
          phone: '+9710984456',
          isLoading: false,
        })

        if (countdown > 0) {
          this.startCountdown()
        }

        resolve()
      }, 2000)
    })
  }

  requestSMS = async (): Promise<void> => {
    return this.requestPhoneStatus()
  }

  requestCall = async (): Promise<void> => {
    return this.requestPhoneStatus()
  }

  startCountdown = (): void => {
    const countdown = this.state.countdown - 1

    if (countdown < 0) {
      this.setState({ countdown: 0 })

      return
    }

    setTimeout(() => {
      this.setState({ countdown })
      this.startCountdown()
    }, ONE_SECOND)
  }

  handleSubmit = async (): Promise<VerifyPhoneCodeFormErrors> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ [FORM_ERROR]: 'Error' }), 5000)
    })
  }

  renderSubmitError = (isSubmitError: boolean): React.ReactNode => {
    if (!(isSubmitError && this.state.countdown)) {
      return null
    }

    return <div className={style.error}>No attempts left.</div>
  }

  renderActions = (isSubmitting: boolean): React.ReactNode => {
    if (this.state.countdown) {
      return null
    }

    return (
      <>
        <LinkButton
          type='button'
          onClick={this.requestSMS}
          className={cc([style.action, style.wide])}
          isDisabled={isSubmitting}
        >
          Resend verification code
        </LinkButton>
        <LinkButton
          type='button'
          onClick={this.requestCall}
          className={cc([style.action, style.wide])}
          isDisabled={isSubmitting}
        >
          Phone call verification
        </LinkButton>
      </>
    )
  }

  renderCountdown = (): React.ReactNode => {
    const { countdown } = this.state

    if (!countdown) {
      return null
    }

    const min = Math.floor(countdown / ONE_MINUTE)
    const sec = countdown - (min * ONE_MINUTE)

    return (
      <div className={style.countdown}>
        You can change your number or wait
        {!!min && (
          <>
            <span>{min}</span> min
          </>
        )}
        {!!sec && (
          <>
            <span>{sec || ''}</span> sec
          </>
        )}.
      </div>
    )
  }

  renderVerifyPhoneCodeForm = ({
    handleSubmit,
    values: { code },
    form: { getState },
    submitting: isSubmitting,
  }: FormRenderProps<VerifyPhoneCodeFormFields>): React.ReactNode => {
    const { phone } = this.state
    const { submitError } = getState()
    const isSubmitError = !!submitError

    return (
      <form
        onSubmit={handleSubmit}
        className={authStyle.form}
      >
        <h2 className={authStyle.title}>Phone Number Verification</h2>
        <div className={style.description}>
          Enter the verification code that was sent to your phone number <span>{phone}</span>.
        </div>
        <InternalLink
          name='VerifyPhone'
          className={style.action}
          isDisabled={isSubmitting}
        >
          CHANGE NUMBER
        </InternalLink>
        <div className={authStyle.fields}>
          <CodeInput
            name='code'
            isDisabled={isSubmitError}
          />
        </div>
        <BigButton
          className={style.button}
          type='submit'
          isLoading={isSubmitting}
          isDisabled={(code.replace('_', '').length !== 6) || isSubmitError}
        >
          Verify
        </BigButton>
        {this.renderSubmitError(isSubmitError)}
        {this.renderCountdown()}
        {this.renderActions(isSubmitting)}
      </form>
    )
  }

  render(): React.ReactNode {
    if (this.state.isLoading) {
      return null
    }

    return (
      <div className={authStyle.main}>
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderVerifyPhoneCodeForm}
          initialValues={RESET_INITIAL_VALUES}
        />
      </div>
    )
  }
}

export default VerifyPhoneCode
