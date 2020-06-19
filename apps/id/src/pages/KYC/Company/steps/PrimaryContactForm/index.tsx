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
  PhoneNumberInput,
  HistoricDateInput,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import isRequired from 'utils/validators/isRequired'
import { CountrySelect } from 'components'

import style from '../style.scss'
import { FormProps } from '../FormProps'

const emptyFileField = {
  error: '',
  fileName: '',
  fileSize: 0,
  isLoading: false,
}

export const PrimaryContactFormComponent: React.FunctionComponent<FormProps> = ({
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
      backHandler={backHandler}
      backLabel={backLabel}
    >
      <div
        className={cc([
          grid.grid,
          style.contact,
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
                  {i18n._('KYC.Company.contact.form.title')}
                </h2>
                <h3 className={style.groupTitle}>
                  {i18n._('KYC.Company.contact.form.personalGroupTitle')}
                </h3>
                <Input
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.firstName.label')}
                  name='firstName'
                  id='__firstName'
                />
                <Input
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.lastName.label')}
                  name='lastName'
                  id='__lastName'
                />
                <Input
                  label={i18n._('KYC.Company.contact.form.middleName.label')}
                  name='middleName'
                  id='__middleName'
                />
                <HistoricDateInput
                  validate={isRequired({ i18n })}
                  hint={i18n._('form.date.hint')}
                  label={i18n._('KYC.Company.contact.form.birthDate.label')}
                  name='birthDate'
                  id='__birthDate'
                />
                <CountrySelect
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.nationality.label')}
                  placeholder={i18n._('KYC.Company.contact.form.nationality.placeholder')}
                  name='nationality'
                  id='__nationality'
                />
                <h3 className={style.groupTitle}>
                  {i18n._('KYC.Company.contact.form.residencyGroupTitle')}
                </h3>
                <PhoneNumberInput
                  validate={isRequired({ i18n })}
                  hint={i18n._('form.phoneNumber.hint')}
                  name='phoneNumber'
                  id='__phoneNumber'
                />
                <Input
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.email.label')}
                  name='email'
                  id='__email'
                />
                <Input
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.streetAddress.label')}
                  name='streetAddress'
                  id='__streetAddress'
                />
                <Input
                  label={i18n._('KYC.Company.contact.form.apartment.label')}
                  name='apartment'
                  id='__apartment'
                />
                <Input
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.city.label')}
                  name='city'
                  id='__city'
                />
                <Input
                  label={i18n._('KYC.Company.contact.form.postCode.label')}
                  name='postCode'
                  id='__postCode'
                />
                <CountrySelect
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.country.label')}
                  placeholder={i18n._('KYC.Company.contact.form.country.placeholder')}
                  name='country'
                  id='__country'
                />
                <FileInput
                  onUpload={uploadDocument}
                  validate={isRequired({ i18n })}
                  placeholder={i18n._('KYC.document.placeholder')}
                  label={i18n._('KYC.Company.contact.form.proofOfAddressDocument.label')}
                  name='proofOfAddressDocument'
                  id='__proofOfAddressDocument'
                  {...(get(documents, 'proofOfAddressDocument',  emptyFileField))}
                />
                <h3 className={style.groupTitle}>
                  {i18n._('KYC.Company.contact.form.passportGroupTitle')}
                </h3>
                <Input
                  validate={isRequired({ i18n })}
                  label={i18n._('KYC.Company.contact.form.passportNumber.label')}
                  name='passportNumber'
                  id='__passportNumber'
                />
                <HistoricDateInput
                  validate={isRequired({ i18n })}
                  hint={i18n._('form.date.hint')}
                  label={i18n._('KYC.Company.contact.form.passportExpirationDate.label')}
                  name='passportExpirationDate'
                  id='__passportExpirationDate'
                />
                <FileInput
                  onUpload={uploadDocument}
                  validate={isRequired({ i18n })}
                  placeholder={i18n._('KYC.document.placeholder')}
                  label={i18n._('KYC.Company.contact.form.passportDocument.label')}
                  name='passportDocument'
                  id='__passportDocument'
                  {...(get(documents, 'passportDocument',  emptyFileField))}
                />
                {submitError && <div className={style.submitError}>{submitError}</div>}
              </div>
              <BigButtonSubmit className={style.submit}
                id='__nextButton'
              >
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
  kyc,
  kycOrganization,
}) => ({
  documents: kyc.documents,
  formValues: kycOrganization.values,
})

const mapDispatch = ({
  kyc,
  kycOrganization,
}) => ({
  uploadDocument: kyc.uploadDocument,
  submit: (callback) => (values) =>
    kycOrganization
      .validate({step: 2, ...values})
      .then(errors => {
        if (errors) {
          return errors
        }

        return kycOrganization.addValues(values).then(callback)
      }),
})

export const PrimaryContactForm = connect(
  mapState,
  mapDispatch,
)(PrimaryContactFormComponent)
