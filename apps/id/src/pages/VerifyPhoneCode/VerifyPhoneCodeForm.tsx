import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import { FormRenderProps } from 'react-final-form'

import {
  CodeInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'


import style from './style.scss'
import { useStore } from 'effector-react'
import { submitCodeFx } from 'effector/phone/events'
import { APIRqVerifyPhoneNumber, PhoneVerificationStatus } from 'effector/phone/types'

const isCodeFilled = (error: string) => (value: string): string | undefined =>
  (!value || value.replace('_', '').length !== 6)
    ? error
    : undefined

const VerifyPhoneCodeForm: React.FunctionComponent<FormRenderProps<APIRqVerifyPhoneNumber>> = ({
  handleSubmit,
}) => {
  const i18n = useI18n()
  const isLoading = useStore(submitCodeFx.pending)

  return (
    <form
      onSubmit={
        values => handleSubmit(values)
          ?.then(response => {
            if (response?.data.data.status === PhoneVerificationStatus.codeIncorrect) {
              console.log('SUUBMITTED', response)
              return {
                pin: i18n._('VerifyPhoneCode.form.code.error.codeIncorrect')
              }
            }

            return {}
          })
          ?.catch(error => error.formValidation)
      }
    >
      <CodeInput
        validate={isCodeFilled(i18n._('VerifyPhoneCode.form.code.error'))}
        label={i18n._('VerifyPhoneCode.form.code.label')}
        name='pin'
        isDisabled={isLoading}
      />
      <BigButtonSubmit className={style.button}>
        {i18n._('VerifyPhoneCode.form.submit')}
      </BigButtonSubmit>
    </form>
  )
}

export default React.memo(VerifyPhoneCodeForm)
