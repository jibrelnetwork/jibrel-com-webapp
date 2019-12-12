import React, { Component } from 'react'

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
import COUNTRIES_INDEX from 'components/CountrySelect/countries/index.json'
import { useI18n } from 'app/i18n'
import { isRequired } from 'utils/validators'

import Code from './Code'

import style from './style.scss'

interface VerifyPhoneFormFields {
  country: string;
  phone: string;
}

interface VerifyPhoneFormErrors {
  country?: string;
  phone?: string;
}

interface VerifyPhoneProps {
  handleSubmit: (values: VerifyPhoneFormFields) => Promise<VerifyPhoneFormErrors | string>;
}

const VERIFY_PHONE_INITIAL_VALUES: VerifyPhoneFormFields = {
  country: 'us',
  phone: '',
}

class VerifyPhone extends Component<VerifyPhoneProps> {
  handleSubmit = async (): Promise<VerifyPhoneFormErrors> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({}), 5000)
    })
  }

  renderVerifyPhoneForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<VerifyPhoneFormFields>): React.ReactNode => {
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
            name='phone'
          />
        </div>
        <BigButtonSubmit>
          Send Code
        </BigButtonSubmit>
      </form>
    )
  }

  render(): React.ReactNode {
    return (
      <div className={authStyle.main}>
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderVerifyPhoneForm}
          initialValues={VERIFY_PHONE_INITIAL_VALUES}
        />
      </div>
    )
  }

  static Code = Code
}

export default VerifyPhone
