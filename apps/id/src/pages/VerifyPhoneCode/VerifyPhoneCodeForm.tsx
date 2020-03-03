import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import { FormRenderProps } from 'react-final-form'

import {
  CodeInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'


import style from './style.scss'
import { $PhoneStore } from 'effector/phone/store'
import { useStore } from 'effector-react'

const isCodeFilled = (error: string) => (value: string): string | undefined =>
  (!value || value.replace('_', '').length !== 6)
    ? error
    : undefined

interface VerifyPhoneCodeFormProps extends FormRenderProps {
  isLoading: boolean;
}

const VerifyPhoneCodeForm: React.FunctionComponent<VerifyPhoneCodeFormProps> = ({
  handleSubmit,
}) => {
  const i18n = useI18n()
  const { isLoading } = useStore($PhoneStore)

  return (
    <form onSubmit={handleSubmit}>
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
