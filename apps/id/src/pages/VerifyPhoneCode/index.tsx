import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { useI18n } from '@jibrelcom/i18n'
import { InternalLink } from '@jibrelcom/ui'

import store, {
  Dispatch,
  RootState,
} from 'store'

import {
  PhoneVerificationStatus,
  PhoneAPIPinFields,
  FormSubmit,
} from 'store/types'

import style from './style.scss'
import LockedActions from './LockedActions'
import authStyle from '../../styles/auth.scss'
import VerifyPhoneCodeForm from './VerifyPhoneCodeForm'

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
}) => {
  const i18n = useI18n()

  return (
    <div className={authStyle.main}>
      <div className={authStyle.form}>
        <h2 className={authStyle.title}>
          {i18n._('VerifyPhoneCode.form.title')}
        </h2>
        <div
          className={style.description}
          dangerouslySetInnerHTML={{
            __html: i18n._('VerifyPhoneCode.form.description', { maskedNumber }),
          }}
        />
        <InternalLink
          name='VerifyPhone'
          className={style.action}
          isDisabled={isLoading}
        >
          {i18n._('VerifyPhoneCode.form.changeNumber')}
        </InternalLink>
        <Form
          onSubmit={onSubmit}
          component={VerifyPhoneCodeForm}
          initialValues={INITIAL_VALUES}
        />
        {status === PhoneVerificationStatus.max_attempts_reached && (
          <div className={style.error}>{i18n._('VerifyPhoneCode.error.noAttempts')}</div>
        )}
        {status === PhoneVerificationStatus.expired && (
          <div className={style.error}>{i18n._('VerifyPhoneCode.error.codeExpired')}</div>
        )}
        <LockedActions />
      </div>
    </div>
  )
}

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
