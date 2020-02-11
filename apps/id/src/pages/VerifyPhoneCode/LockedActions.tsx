import React, { useState } from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'
import { LinkButton } from '@jibrelcom/ui'

import store, {
  Dispatch,
  RootState,
} from 'store'

import Countdown from 'components/Countdown'
import { PhoneConfirmationVariant } from 'store/types'

import style from './style.scss'

interface LockedActionsProps {
  onRequestSMS: () => void;
  onRequestCall: () => void;
  confirmationVariant: PhoneConfirmationVariant | null;
  timeout: number;
  isLoading: boolean;
}

const LockedActions: React.FunctionComponent<LockedActionsProps> = ({
  timeout,
  onRequestSMS,
  onRequestCall,
  isLoading = false,
  confirmationVariant,
}) => {
  if (timeout < 0) {
    return null
  }

  const i18n = useI18n()
  const [isLocked, setIsLocked] = useState(timeout > 0)

  if (isLocked) {
    return (
      <div className={style.countdown}>
        {i18n._('VerifyPhoneCode.actions.requestAgain')}
        <Countdown timeLeft={timeout} onFinish={(): void => setIsLocked(false)} />.
      </div>
    )
  }

  return (
    <>
      <LinkButton
        type='button'
        onClick={onRequestSMS}
        className={cc([style.action, style.wide])}
        isDisabled={isLoading}
      >
        {confirmationVariant === PhoneConfirmationVariant.sms
          ? i18n._('VerifyPhoneCode.actions.resendCode')
          : i18n._('VerifyPhoneCode.actions.sendSMS')
        }
      </LinkButton>
      <LinkButton
        type='button'
        onClick={onRequestCall}
        className={cc([style.action, style.wide])}
        isDisabled={isLoading}
      >
        {confirmationVariant === PhoneConfirmationVariant.call
          ? i18n._('VerifyPhoneCode.actions.callAgain')
          : i18n._('VerifyPhoneCode.actions.phoneCall')
        }
      </LinkButton>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.phone.isLoading,
    timeout: store.select.phone.timeout(state),
    confirmationVariant: state.phone.confirmationVariant,
  }),
  (dispatch: Dispatch) => ({
    onRequestSMS: () => dispatch.phone.requestSMS(),
    onRequestCall: () => dispatch.phone.requestCall(),
  })
)(LockedActions)
