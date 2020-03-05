import React, { useState } from 'react'
import cc from 'classcat'
import { combine } from 'effector'
import { useEvent, useStore, createComponent } from 'effector-react'

import { useI18n } from '@jibrelcom/i18n'
import { LinkButton } from '@jibrelcom/ui'

import Countdown from 'components/Countdown'
import { $PhoneStore } from 'effector/phone/store'
import { requestVerificationCode, submitCodeFx } from 'effector/phone/events'
import { PhoneVerificationState, PhoneConfirmationVariant } from 'effector/phone/types'

import style from './style.scss'

const calculateTimeout = (requestAvailableAt?: Date): number => {
    if (requestAvailableAt === undefined) {
      return -1
    }

    return Math.max(
      0,
      Math.round(
        (+requestAvailableAt - Date.now())
        / 1000
      )
    )
  }

export default createComponent<{}, PhoneVerificationState>(
  $PhoneStore,
  (props, store
  ) => {
  const timeout = calculateTimeout(store.requestAvailableAt)
  const i18n = useI18n()
  const [isLocked, setIsLocked] = useState(timeout > 0)
  const handleRequestVerificationCode = useEvent(requestVerificationCode)
  const isLoading = useStore(combine(
    submitCodeFx.pending,
    requestVerificationCode.pending,
    (codePending, verificationPending) => codePending || verificationPending
  ))

  if (timeout < 0) {
    return null
  }

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
        {store.confirmationVariant === PhoneConfirmationVariant.sms
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
        {store.confirmationVariant === PhoneConfirmationVariant.call
          ? i18n._('VerifyPhoneCode.actions.callAgain')
          : i18n._('VerifyPhoneCode.actions.phoneCall')
        }
      </LinkButton>
    </>
  )
})
