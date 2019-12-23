import React from 'react'
import { connect } from 'react-redux'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import KYCLayout from 'layouts/KYCLayout'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import { useI18n } from 'app/i18n'
import { I18n } from '@lingui/core'
import { FormSubmit } from 'store/types/form'

import {
  Documents,
  PersonalValues,
  KYCIndividualValues,
  KYCIndividualStatus,
  UploadDocumentHandler,
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
import style from './style.scss'

export interface KYCIndividualProps {
  goBack: () => void;
  uploadDocument: UploadDocumentHandler;
  submit: FormSubmit<KYCIndividualValues>;
  documents: Documents;
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
  uploadDocument,
  values,
  status,
  documents,
}) => {
  const i18n = useI18n()

  return (
    <KYCLayout
      backHandler={goBack}
      backLabel={(status === KYCIndividualStatus.personal) ? 'Back to start' : 'Previous'}
    >
      <div className={grid.grid}>
        <h2 className={`${grid.column} ${style.title}`}>{getTitle(i18n, status)}</h2>
        <Form
          onSubmit={submit}
          initialValues={values}
          render={(formProps: FormRenderProps): React.ReactNode => {
            switch(status) {
              case KYCIndividualStatus.personal:
                return (
                  <PersonalForm
                    formProps={formProps}
                    uploadDocument={uploadDocument}
                    documents={documents}
                  />
                )

              case KYCIndividualStatus.residency:
                return (
                  <ResidencyForm
                    formProps={formProps}
                    uploadDocument={uploadDocument}
                    documents={documents}
                  />
                )

              case KYCIndividualStatus.income:
                return <IncomeForm formProps={formProps} />

              default:
                return null
            }
          }}
        />
      </div>
    </KYCLayout>
  )
}

export default connect(
  (state: RootState) => ({
    documents: state.kyc.documents,
    status: state.kycIndividual.status,
    values: state.kycIndividual.values,
  }),
  (dispatch: Dispatch) => ({
    goBack: dispatch.kycIndividual.goBack,
    submit: dispatch.kycIndividual.submit,
    uploadDocument: dispatch.kyc.uploadDocument,
  }),
)(KYCIndividual)
