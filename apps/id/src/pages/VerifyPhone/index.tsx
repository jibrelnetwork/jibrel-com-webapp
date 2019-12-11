import React, { Component } from 'react'

import {
  BigButton,
  PhoneInput,
} from '@jibrelcom/ui'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import style from './style.scss'
import authStyle from '../../styles/auth.scss'
import CountrySelect from '../../components/CountrySelect'
import COUNTRIES_INDEX from '../../components/CountrySelect/countries/index.json'

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
    values: {
      country,
      phone,
    },
    submitting: isSubmitting,
  }: FormRenderProps<VerifyPhoneFormFields>): React.ReactNode => {
    const countryData = COUNTRIES_INDEX[country]

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
            name='country'
            label='Country'
          />
          <PhoneInput
            ccc={countryData.ccc}
            name='phone'
          />
        </div>
        <BigButton
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!(country && phone)}
        >
          Send Code
        </BigButton>
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
}

export default VerifyPhone
