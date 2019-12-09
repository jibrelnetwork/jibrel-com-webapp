import React from 'react'
import { Form, FormRenderProps } from 'react-final-form'
import { SubmissionErrors } from 'final-form'
import {
  Input,
  BigButton,
} from '@jibrelcom/ui'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import noop from 'lodash-es/noop'
import cc from 'classcat'

import AuthenticatedLayout from 'layouts/AuthenticatedLayout'
import { useI18n } from 'app/i18n'
import axios from 'store/axios'
import CountrySelect from 'components/CountrySelect'

import style from './style.scss'

export interface PersonalFormFields {
  firstName: string;
  lastName: string;
  middleName?: string;
  alias?: string;
  birthDate: string;
  nationality: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportFrontPage: string;
}

export interface PersonalProps {
  onSubmitSuccess: (fields: PersonalFormFields) => undefined;
}

function asyncValidation (fields: PersonalFormFields): Promise<SubmissionErrors | undefined | void> {
  return axios.post('/v1/kyc/personal/validate', fields)
  // return new Promise((resolve) => setTimeout(resolve, 800))
}

const PersonalFormContents: React.FunctionComponent<FormRenderProps> = ({
  handleSubmit,
}) => {
  const i18n = useI18n()

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={i18n._('KYCInvestor.Personal.input.firstName.title')}
        name='firstName'
      />
      <Input
        label={i18n._('KYCInvestor.Personal.input.lastName.title')}
        name='lastName'
      />
      <Input
        label={i18n._('KYCInvestor.Personal.input.middleName.title')}
        name='middleName'
      />
      <Input
        label={i18n._('KYCInvestor.Personal.input.alias.title')}
        name='alias'
      />
      <Input
        label={i18n._('KYCInvestor.Personal.input.birthDate.title')}
        name='birthDate'
        placeholder='DD/MM/YYYY'
      />
      <CountrySelect
        label={i18n._('KYCInvestor.Personal.input.nationality.title')}
        name='nationality'
        placeholder={i18n._('KYCInvestor.Personal.input.nationality.placeholder')}
      />
      <h3 className={style.groupTitle}>Personal ID</h3>
      <Input
        label={i18n._('KYCInvestor.Personal.input.passportNumber.title')}
        name='passportNumber'
      />
      <Input
        label={i18n._('KYCInvestor.Personal.input.passportExpirationDate.title')}
        name='passportExpirationDate'
        placeholder='DD/MM/YYYY'
      />
      <Input
        label={i18n._('KYCInvestor.Personal.input.passportFrontPage.title')}
        name='passportFrontPage'
      />
      <BigButton
        type='submit'
      >
        {i18n._('KYCInvestor.form.action.next')}
      </BigButton>
    </form>
  )
}

const Personal: React.FunctionComponent<PersonalProps> = ({
  onSubmitSuccess = noop,
}) => {
  const handleFormSubmit = (fields: PersonalFormFields): Promise<SubmissionErrors | undefined | void> =>
    asyncValidation(fields)
      .then((errors) => errors
        ? errors
        : onSubmitSuccess(fields)
      )

  return (
    <AuthenticatedLayout>
      <div className={grid.grid}>
        <h1 className={cc([
          grid.column,
          style.title,
        ])}>Investor Verification Form</h1>
        <div className={cc([
          grid.column,
          style.step,
        ])}>
          <h2 className={style.stepTitle}>Personal Information</h2>
          <Form
            onSubmit={handleFormSubmit}
            render={PersonalFormContents}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Personal
