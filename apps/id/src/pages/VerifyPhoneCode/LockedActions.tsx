import React, { useState } from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import store, { Dispatch, RootState } from 'store'
import { LinkButton } from '@jibrelcom/ui'

import { PhoneConfirmationVariant } from 'store/types'
import Countdown from 'components/Countdown'
import style from './style.scss'

interface LockedActionsProps {
  timeout: number;
  onRequestSMS: () => void;
  onRequestCall: () => void;
  isLoading: boolean;
  confirmationVariant: PhoneConfirmationVariant | null;
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

  const [isLocked, setIsLocked] = useState(timeout > 0)

  if (isLocked) {
    return (
      <div className={style.countdown}>
        You can request the code again in
        <Countdown timeLeft={timeout} onFinish={() => setIsLocked(false)} />.
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
          ? 'Resend verification code'
          : 'Send SMS verification'
        }
      </LinkButton>
      <LinkButton
        type='button'
        onClick={onRequestCall}
        className={cc([style.action, style.wide])}
        isDisabled={isLoading}
      >
        {confirmationVariant === PhoneConfirmationVariant.call
          ? 'Call again'
          : 'Phone call verification'
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
