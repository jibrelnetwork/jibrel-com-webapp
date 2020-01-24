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
          <form onSubmit={handleSubmit} className={style.step}>
            <h2 className={style.title}>
              Company Information
            </h2>
            <Input
              name='companyName'
              label={'Company Name'}
              validate={isRequired({i18n})}
            />
            <Input
              name='tradingName'
              label={'Trading Name'}
              validate={isRequired({i18n})}
            />
            <HistoricDateInput
              name='dateOfIncorporation'
              label={'Date of Incorporation'}
              validate={isRequired({i18n})}
            />
            <Input
              name='placeOfIncorporation'
              label={'Place of Incorporation'}
              validate={isRequired({i18n})}
            />

            <h3 className={style.groupTitle}>
              {'Company Documentation'}
            </h3>

            <FileInput
              name='commercialRegister'
              label={'Commercial Register'}
              placeholder={'PNG, PDF, JPG'}
              onUpload={uploadDocument}
              {...(get(documents, 'commercialRegister', emptyFileField))}

              validate={isRequired({i18n})}
            />
            <FileInput
              name='shareholderRegister'
              label={'Shareholder Register'}
              placeholder={'PNG, PDF, JPG'}
              onUpload={uploadDocument}
              {...(get(documents, 'shareholderRegister', emptyFileField))}
              validate={isRequired({i18n})}
            />
            <FileInput
              name='articlesOfIncorporation'
              label={'Article of Incorporation'}
              placeholder={'PNG, PDF, JPG'}
              onUpload={uploadDocument}
              {...(get(documents, 'articlesOfIncorporation', emptyFileField))}
              validate={isRequired({i18n})}
            />

            {submitError && <div className={style.submitError}>{submitError}</div>}

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

const mapState = ({kycOrganization, kyc}) => ({
  formValues: kycOrganization.values,
  documents: kyc.documents,
})

const mapDispatch = ({kyc, kycOrganization}) => ({
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

export const CompanyInformationForm = connect(mapState, mapDispatch)(CompanyInformationFormComponent)
