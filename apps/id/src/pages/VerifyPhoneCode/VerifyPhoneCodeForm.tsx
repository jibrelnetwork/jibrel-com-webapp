import React from 'react'
import {
  FormRenderProps,
} from 'react-final-form'
import {
  BigButtonSubmit,
  CodeInput,
} from '@jibrelcom/ui'

import style from './style.scss'
import { connect } from 'react-redux'
import { RootState } from 'store'

// FIXME: use i18n
const isCodeFilled = (value: string): string | undefined =>
  !value || value.replace('_', '').length !== 6
    ? 'Please, fill the code'
    : undefined

interface VerifyPhoneCodeFormProps extends FormRenderProps {
  isLoading: boolean;
}

const VerifyPhoneCodeForm: React.FunctionComponent<VerifyPhoneCodeFormProps> = ({
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <CodeInput
      name='pin'
      validate={isCodeFilled}
    />
    <BigButtonSubmit
      className={style.button}
    >
      Verify
    </BigButtonSubmit>
  </form>
)

export default connect(
  ({ phone }: RootState) => ({
    isLoading: phone.isLoading,
  }),
)(VerifyPhoneCodeForm)
