import React from 'react'
import cc from 'classcat'
import get from 'lodash-es/get'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { useI18n } from '@jibrelcom/i18n'

import {
  Input,
  FileInput,
  BigButtonSubmit,
  HistoricDateInput,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import isRequired from 'utils/validators/isRequired'

import style from '../style.scss'
import { FormProps } from '../FormProps'

const emptyFileField = {
  error: '',
  fileName: '',
  fileSize: 0,
  isLoading: false,
}

const CompanyInformationFormComponent: React.FunctionComponent<FormProps> = ({
  submit,
  backHandler,
  nextHandler,
  uploadDocument,
  documents,
  formValues,
  backLabel,
  nextLabel,
}) => {
  const i18n = useI18n()

  return (
    <KYCLayout
      backLabel={backLabel}
      backHandler={backHandler}
    >
      <div
        className={cc([
          grid.grid,
          style.company,
          style.background,
        ])}
      >
      <Form
        initialValues={formValues}
        onSubmit={submit(nextHandler)}
        render={({
          handleSubmit,
          submitError,
        }): React.ReactNode => (
          <form onSubmit={handleSubmit}>
            <div className={style.step}>
              <h2 className={style.title}>
                {i18n._('KYC.Company.company.form.title')}
              </h2>
              <Input
                validate={isRequired({ i18n })}
                label={i18n._('KYC.Company.company.form.companyName.label')}
                name='companyName'
              />
              <Input
                validate={isRequired({ i18n })}
                label={i18n._('KYC.Company.company.form.tradingName.label')}
                name='tradingName'
              />
              <HistoricDateInput
                validate={isRequired({ i18n })}
                hint={i18n._('form.date.hint')}
                label={i18n._('KYC.Company.company.form.dateOfIncorporation.label')}
                name='dateOfIncorporation'
              />
              <Input
                validate={isRequired({ i18n })}
                label={i18n._('KYC.Company.company.form.placeOfIncorporation.label')}
                name='placeOfIncorporation'
              />
              <h3 className={style.groupTitle}>
                {i18n._('KYC.Company.company.form.documentationGroupTitle')}
              </h3>
              <FileInput
                onUpload={uploadDocument}
                validate={isRequired({ i18n })}
                placeholder={i18n._('KYC.document.placeholder')}
                label={i18n._('KYC.Company.company.form.commercialRegister.label')}
                {...(get(documents, 'commercialRegister', emptyFileField))}
                name='commercialRegister'
              />
              <FileInput
                onUpload={uploadDocument}
                validate={isRequired({ i18n })}
                placeholder={i18n._('KYC.document.placeholder')}
                label={i18n._('KYC.Company.company.form.shareholderRegister.label')}
                {...(get(documents, 'shareholderRegister', emptyFileField))}
                name='shareholderRegister'
              />
              <FileInput
                onUpload={uploadDocument}
                validate={isRequired({ i18n })}
                label={i18n._('KYC.Company.company.form.articlesOfIncorporation.label')}
                placeholder={i18n._('KYC.document.placeholder')}
                {...(get(documents, 'articlesOfIncorporation', emptyFileField))}
                name='articlesOfIncorporation'
              />
              {submitError && <div className={style.submitError}>{submitError}</div>}
            </div>
            <BigButtonSubmit className={style.submit}>
              {nextLabel}
            </BigButtonSubmit>
          </form>
        )}
      />
      </div>
    </KYCLayout>
  )
}

const mapState = ({
  kycOrganization,
  kyc,
}) => ({
  formValues: kycOrganization.values,
  documents: kyc.documents,
})

const mapDispatch = ({
  kyc,
  kycOrganization,
}) => ({
  uploadDocument: kyc.uploadDocument,
  submit: (callback) => (values) =>
    kycOrganization
      .validate({step: 0, ...values})
      .then(errors => {
        if (errors) {
          return errors
        }

        return kycOrganization.addValues(values).then(callback)
      }),
})

export const CompanyInformationForm = connect(
  mapState,
  mapDispatch,
)(CompanyInformationFormComponent)
