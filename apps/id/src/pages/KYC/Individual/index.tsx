import React from 'react'
import { connect } from 'react-redux'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import KYCLayout from 'layouts/KYCLayout'
import { useI18n } from 'app/i18n'
import { I18n } from '@lingui/core'
import { FormSubmit } from 'store/types/form'

import {
  PersonalValues,
  KYCIndividualValues,
  KYCIndividualStatus,
} from 'store/types/kyc'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  IncomeForm,
  PersonalForm,
  ResidencyForm,
} from './steps'

export interface KYCIndividualProps {
  goBack: () => void;
  submit: FormSubmit<KYCIndividualValues>;
  values: PersonalValues;
  status: KYCIndividualStatus;
}

const getTitle = (i18n: I18n, status: KYCIndividualStatus): string | undefined => {
  switch(status) {
    case KYCIndividualStatus.personal:
      return i18n._('KYC.Personal.section.personal.title')

    case KYCIndividualStatus.residency:
      return 'Current Residential Address'

    case KYCIndividualStatus.income:
      return 'Declaration of Source of Funds'

    default:
      return undefined
  }
}

const KYCIndividual: React.FunctionComponent<KYCIndividualProps> = ({
  goBack,
  submit,
  values,
  status,
}) => {
  const i18n = useI18n()

  return (
    <KYCLayout
      backHandler={goBack}
      title={getTitle(i18n, status)}
      backLabel='BACK TO START'
    >
      <Form
        onSubmit={submit}
        initialValues={values}
        render={(formProps: FormRenderProps): React.ReactNode => {
          switch(status) {
            case KYCIndividualStatus.personal:
              return <PersonalForm form={formProps} />

            case KYCIndividualStatus.residency:
              return <ResidencyForm form={formProps} />

            case KYCIndividualStatus.income:
              return <IncomeForm form={formProps} />

            default:
              return null
          }
        }}
      />
    </KYCLayout>
  )
}

export default connect(
  (state: RootState) => ({
    status: state.kycIndividual.status,
    values: state.kycIndividual.values,
  }),
  (dispatch: Dispatch) => ({
    goBack: dispatch.kycIndividual.goBack,
    submit: dispatch.kycIndividual.submit,
  }),
)(KYCIndividual)
