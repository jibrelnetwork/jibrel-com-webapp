import React from 'react'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'

import style from './style.scss'
import authStyle from '../../styles/auth.scss'
import store, { Dispatch, RootState } from 'store'
import {
  PhoneVerificationStatus,
  PhoneAPIPinFields,
  FormSubmit,
} from 'store/types'
import VerifyPhoneCodeForm from './VerifyPhoneCodeForm'
import LockedActions from './LockedActions'
import InternalLink from 'components/InternalLink'

interface VerifyPhoneCodeProps {
  status: PhoneVerificationStatus;
  maskedNumber: string;
  timeout: number;
  isLoading: boolean;
  onSubmit: FormSubmit<PhoneAPIPinFields>;
}

const INITIAL_VALUES: PhoneAPIPinFields = {
  pin: '',
}

const VerifyPhoneCode: React.FunctionComponent<VerifyPhoneCodeProps> = ({
  maskedNumber,
  onSubmit,
  status,
  isLoading,
}) => (
  <div className={authStyle.main}>
    <div className={authStyle.form}>
      <h2 className={authStyle.title}>Phone Number Verification</h2>
      <div className={style.description}>
        Enter the verification code that was sent to your phone number ending with <span>{maskedNumber}</span>.
      </div>
      <InternalLink
        name='VerifyPhone'
        className={style.action}
        isDisabled={isLoading}
      >
        CHANGE NUMBER
      </InternalLink>
      <Form
        onSubmit={onSubmit}
        component={VerifyPhoneCodeForm}
        initialValues={INITIAL_VALUES}
      />
      {status === PhoneVerificationStatus.max_attempts_reached && (
        <div className={style.error}>No attempts left.</div>
      )}
      {status === PhoneVerificationStatus.expired && (
        <div className={style.error}>Code expired.</div>
      )}
      <LockedActions />
    </div>
  </div>
)

export default connect(
  (state: RootState) => ({
    isLoading: state.phone.isLoading,
    maskedNumber: state.phone.maskedNumber,
    status: state.phone.status,
    timeout: store.select.phone.timeout(state),
  }),
  (dispatch: Dispatch) => ({
    onSubmit: dispatch.phone.submitCode,
  }),
)(VerifyPhoneCode)
