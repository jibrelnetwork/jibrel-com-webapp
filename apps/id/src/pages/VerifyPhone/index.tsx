import React from 'react'
import COUNTRIES_INDEX from '@jibrelcom/countries/src/index.json'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  PhoneInput,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import authStyle from 'styles/auth.scss'
import CountrySelect from 'components/CountrySelect'
import { isRequired } from 'utils/validators'

import { FormSubmitResult, PhoneAPINumberFields } from 'store/types'

import style from './style.scss'
import { Dispatch } from 'store'
import { AuthLayout } from 'layouts'

const VERIFY_PHONE_INITIAL_VALUES: PhoneAPINumberFields = {
  country: 'us',
  countryCode: COUNTRIES_INDEX.us.ccc,
  number: '',
}

const VerifyPhoneForm: React.FunctionComponent<FormRenderProps> = ({
  handleSubmit,
  values,
}) => {
  const i18n = useI18n()
  const countryData = COUNTRIES_INDEX[values.country]

  if (!countryData) {
    return null
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={authStyle.form}
    >
      <h2 className={authStyle.title}>Add Your Phone Number</h2>
      <div className={style.description}>
        Provide a phone number to verify your account.
      </div>
      <div className={authStyle.fields}>
        <CountrySelect
          validate={isRequired({ i18n })}
          name='country'
          label='Country'
        />
        <PhoneInput
          validate={isRequired({ i18n })}
          ccc={countryData.ccc}
          name='number'
        />
      </div>
      <BigButtonSubmit>
        Send Code
      </BigButtonSubmit>
    </form>
  )
}

interface VerifyPhoneProps {
  onSubmit: (values: PhoneAPINumberFields) => FormSubmitResult<PhoneAPINumberFields>;
}

const VerifyPhone: React.FunctionComponent<VerifyPhoneProps> = ({
  onSubmit,
}) => {
  return (
    <AuthLayout>
      <div className={authStyle.main}>
        <Form
          onSubmit={(values: PhoneAPINumberFields): FormSubmitResult<PhoneAPINumberFields> => onSubmit({
            ...values,
            countryCode: COUNTRIES_INDEX[values.country].ccc,
          })}
          render={VerifyPhoneForm}
          initialValues={VERIFY_PHONE_INITIAL_VALUES}
        />
      </div>
    </AuthLayout>
  )
}

export default connect(
  null,
  (dispatch: Dispatch) => ({
    onSubmit: dispatch.phone.setNumber,
  })
)(VerifyPhone)
