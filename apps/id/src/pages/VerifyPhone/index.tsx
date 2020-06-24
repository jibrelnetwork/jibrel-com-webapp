import React from 'react'
import COUNTRIES_INDEX from '@jibrelcom/countries/src/index.json'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'
import { CountryCode } from '@jibrelcom/countries/src/types'

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
import { Dispatch } from 'store'
import { AuthLayout } from 'layouts'
import { isRequired } from 'utils/validators'

import {
  FormSubmitResult,
  PhoneAPINumberFields,
} from 'store/types'

import style from './style.scss'

const VERIFY_PHONE_INITIAL_VALUES: PhoneAPINumberFields = {
  country: CountryCode.us,
  countryCode: COUNTRIES_INDEX.us.ccc,
  number: '',
}

const VerifyPhoneForm: React.FunctionComponent<FormRenderProps<PhoneAPINumberFields>> = ({
  handleSubmit,
  values,
}) => {
  const i18n = useI18n()
  const countryData = COUNTRIES_INDEX[values.country]

  return (
    <form
      onSubmit={handleSubmit}
      className={authStyle.form}
    >
      <h2 className={authStyle.title}>
        {i18n._('VerifyPhone.form.title')}
      </h2>
      <div className={style.description}>
        {i18n._('VerifyPhone.form.description')}
      </div>
      <div className={authStyle.fields}>
        <CountrySelect
          validate={isRequired({ i18n })}
          label={i18n._('VerifyPhone.form.country.label')}
          name='country'
        />
        <PhoneInput
          validate={isRequired({ i18n })}
          ccc={countryData.ccc}
          name='number'
        />
      </div>
      <BigButtonSubmit>
        {i18n._('VerifyPhone.form.submit')}
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
          onSubmit={(
            values: PhoneAPINumberFields,
          ): FormSubmitResult<PhoneAPINumberFields> => onSubmit({
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
