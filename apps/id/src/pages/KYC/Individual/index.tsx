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
import { connect } from 'react-redux'

import AuthenticatedLayout from 'layouts/AuthenticatedLayout'
import { useI18n } from 'app/i18n'
import axios from 'store/axios'
import CountrySelect from 'components/CountrySelect'
import { PersonalValues } from 'store/types'
import {
  RootState,
  Dispatch,
} from 'store'

import style from './style.scss'

export interface PersonalProps {
  initialValues: PersonalValues | {};
  onSubmitSuccess: (fields: PersonalValues) => undefined;
}

function asyncValidation (values: PersonalValues): Promise<SubmissionErrors | undefined | void> {
  return axios.post('/v1/kyc/individual/validate', values)
}

const PersonalFormContents: React.FunctionComponent<FormRenderProps> = ({
  handleSubmit,
}) => {
  const i18n = useI18n()

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={i18n._('KYC.Personal.input.firstName.title')}
        name='firstName'
      />
      <Input
        label={i18n._('KYC.Personal.input.lastName.title')}
        name='lastName'
      />
      <Input
        label={i18n._('KYC.Personal.input.middleName.title')}
        name='middleName'
      />
      <Input
        label={i18n._('KYC.Personal.input.alias.title')}
        name='alias'
      />
      <Input
        label={i18n._('KYC.Personal.input.birthDate.title')}
        name='birthDate'
        placeholder='DD/MM/YYYY'
      />
      <CountrySelect
        label={i18n._('KYC.Personal.input.nationality.title')}
        name='nationality'
        placeholder={i18n._('KYC.Personal.input.nationality.placeholder')}
      />
      <h3 className={style.groupTitle}>
        {i18n._('KYC.Personal.section.passport.title')}
      </h3>
      <Input
        label={i18n._('KYC.Personal.input.passportNumber.title')}
        name='passportNumber'
      />
      <Input
        label={i18n._('KYC.Personal.input.passportExpirationDate.title')}
        name='passportExpirationDate'
        placeholder='DD/MM/YYYY'
      />
      <Input
        label={i18n._('KYC.Personal.input.passportFrontPage.title')}
        name='passportDocument'
      />
      <BigButton
        type='submit'
        className={style.submit}
      >
        {i18n._('KYC.form.action.next')}
      </BigButton>
    </form>
  )
}

const Personal: React.FunctionComponent<PersonalProps> = ({
  initialValues = {},
  onSubmitSuccess = noop,
}) => {
  const handleFormSubmit = (values: PersonalValues): Promise<SubmissionErrors | undefined | void> =>
    asyncValidation(values)
      .then((errors) => errors
        ? errors
        : onSubmitSuccess(values)
      )
  const i18n = useI18n()

  return (
    <AuthenticatedLayout>
      <div className={grid.grid}>
        <h1 className={cc([
          grid.column,
          style.title,
        ])}>
          {i18n._('KYC.Personal.title')}
        </h1>
        <div className={cc([
          grid.column,
          style.step,
        ])}>
          <h2 className={style.stepTitle}>
            {i18n._('KYC.Personal.section.personal.title')}
          </h2>
          <Form
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            render={PersonalFormContents}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default connect(
  (state: RootState) => ({
    initialValues: state.kycIndividual.values,
  }),
  (dispatch: Dispatch) => ({
    onSubmitSuccess: (values: PersonalValues): void => {
      dispatch.kycIndividual.addValues(values)
      dispatch.kycIndividual.next()
    }
  }),
)(Personal)
