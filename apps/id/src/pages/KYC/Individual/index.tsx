import React from 'react'
import noop from 'lodash-es/noop'
import { connect } from 'react-redux'
import { SubmissionErrors } from 'final-form'

import {
  Input,
  BigButton,
  FileInput,
} from '@jibrelcom/ui'

import {
  Form,
  FormRenderProps,
} from 'react-final-form'

import axios from 'store/axios'
import KYCLayout from 'layouts/KYCLayout'
import CountrySelect from 'components/CountrySelect'
import { useI18n } from 'app/i18n'
import { PersonalValues } from 'store/types/kyc'

import {
  RootState,
  Dispatch,
} from 'store'

import style from './style.scss'

export interface KYCIndividualProps {
  uploadDocument: (file: File, name: string) => void;
  onSubmitSuccess: (fields: PersonalValues) => undefined;
  initialValues: PersonalValues | {};
  fields: object;
}

function asyncValidation (values: PersonalValues): Promise<SubmissionErrors | undefined | void> {
  return axios.post('/v1/kyc/individual/validate', values)
}

const KYCIndividual: React.FunctionComponent<KYCIndividualProps> = ({
  fields,
  initialValues = {},
  uploadDocument,
  onSubmitSuccess = noop,
}) => {
  const handleFormSubmit = (values: PersonalValues): Promise<SubmissionErrors | undefined | void> =>
    asyncValidation(values)
      .then((errors) => errors
        ? errors
        : onSubmitSuccess(values)
      )
  const i18n = useI18n()

  console.log(fields)

  return (
    <KYCLayout
      title={i18n._('KYC.Personal.section.personal.title')}
      backHandler={console.log}
      backLabel='BACK TO START'
    >
      <Form
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        render={({
          handleSubmit,
        }): React.ReactNode => {
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
              <FileInput
                onChange={(file: File) => uploadDocument({ file, fieldName: 'passportDocument' })}
                fileName={fields.passportDocument ? fields.passportDocument.fileName : ''}
                fileSize={fields.passportDocument ? fields.passportDocument.fileSize : 0}
                isLoading={fields.passportDocument ? fields.passportDocument.isLoading : false}
                error={fields.passportDocument ? fields.passportDocument.error : ''}
                label={i18n._('KYC.Personal.input.passportFrontPage.title')}
                name='passportDocument'
                placeholder='PNG, PDF, JPG'
              />
              <BigButton
                type='submit'
                className={style.submit}
              >
                {i18n._('KYC.form.action.next')}
              </BigButton>
            </form>
          )
        }}
      />
    </KYCLayout>
  )
}

export default connect(
  (state: RootState) => ({
    initialValues: state.kycIndividual.values,
    fields: state.kyc.fields,
  }),
  (dispatch: Dispatch) => ({
    uploadDocument: dispatch.kyc.uploadDocument,
    onSubmitSuccess: (values: PersonalValues): void => {
      dispatch.kycIndividual.addValues(values)
      dispatch.kycIndividual.next()
    }
  }),
)(KYCIndividual)
