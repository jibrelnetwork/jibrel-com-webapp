import React from 'react'
import { Form } from 'react-final-form'
import { useI18n } from '@jibrelcom/i18n'
import { InternalLink } from '@jibrelcom/ui'
import { useEvent, useStore } from 'effector-react'

import {
  PhoneAPIPinFields,
} from 'store/types'

import { $PhoneStore } from 'effector/phone/store'
import { submitCodeFx } from 'effector/phone/events'
import { PhoneVerificationStatus } from 'effector/phone/types'

import style from './style.scss'
import LockedActions from './LockedActions'
import authStyle from '../../styles/auth.scss'
import VerifyPhoneCodeForm from './VerifyPhoneCodeForm'

const INITIAL_VALUES: PhoneAPIPinFields = {
  pin: '',
}

const VerifyPhoneCode: React.FunctionComponent = () => {
  const i18n = useI18n()
  const {
    maskedNumber,
    status,
    isLoading
  } = useStore($PhoneStore)
  const onSubmit = useEvent(submitCodeFx)

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
        {status === PhoneVerificationStatus.maxAttemptsReached && (
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

export default React.memo(VerifyPhoneCode)
