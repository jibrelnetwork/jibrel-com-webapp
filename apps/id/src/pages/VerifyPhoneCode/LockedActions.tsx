import React, { useState } from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'
import { LinkButton } from '@jibrelcom/ui'

import store, {
  RootState,
} from 'store'

import Countdown from 'components/Countdown'
import { PhoneConfirmationVariant } from 'store/types'

import style from './style.scss'
import { $PhoneStore } from 'effector/phone/store'
import { useEvent, useStore } from 'effector-react'
import { requestVerificationCode } from 'effector/phone/events'

interface LockedActionsProps {
  timeout: number;
}

const LockedActions: React.FunctionComponent<LockedActionsProps> = ({
  timeout,
}) => {
  if (timeout < 0) {
    return null
  }

  const i18n = useI18n()
  const [isLocked, setIsLocked] = useState(timeout > 0)
  const { confirmationVariant } = useStore($PhoneStore)
  const handleRequestVerificationCode = useEvent(requestVerificationCode)
  const isLoading = useStore(requestVerificationCode.pending)

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
        onClick={() => handleRequestVerificationCode(PhoneConfirmationVariant.sms)}
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
        onClick={() => handleRequestVerificationCode(PhoneConfirmationVariant.call)}
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
    timeout: store.select.phone.timeout(state),
  })
)(LockedActions)
