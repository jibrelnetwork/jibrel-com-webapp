import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import KYCLayout from 'layouts/KYCLayout'
import { FormSubmit } from 'store/types/form'

import {
  PersonalValues,
  KYCIndividualValues,
  KYCIndividualStatus,
  UploadDocumentHandler,
} from 'store/types/kyc'

import {
  Dispatch,
  RootState,
} from 'store'

import style from './style.scss'

import {
  IncomeForm,
  PersonalForm,
  ResidencyForm,
} from './steps'

export interface KYCIndividualProps {
  goBack: () => void;
  uploadDocument: UploadDocumentHandler;
  submit: FormSubmit<KYCIndividualValues>;
  values: PersonalValues;
  status: KYCIndividualStatus;
}

const KYCIndividual: React.FunctionComponent<KYCIndividualProps> = ({
  goBack,
  submit,
  uploadDocument,
  values,
  status,
}) => {
  const i18n = useI18n()

  return (
    <KYCLayout
      backHandler={goBack}
      backLabel={(status === KYCIndividualStatus.personal)
        ? i18n._('KYC.form.action.start')
        : i18n._('KYC.form.action.prev')
      }
    >
      <div
        className={cc([
          grid.grid,
          style[status],
          style.background,
        ])}
      >
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
                  />
                )

              case KYCIndividualStatus.residency:
                return (
                  <ResidencyForm
                    formProps={formProps}
                    uploadDocument={uploadDocument}
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
    status: state.kycIndividual.status,
    values: state.kycIndividual.values,
  }),
  (dispatch: Dispatch) => ({
    goBack: dispatch.kycIndividual.goBack,
    submit: dispatch.kycIndividual.submit,
    uploadDocument: dispatch.kyc.uploadDocument,
  }),
)(KYCIndividual)
