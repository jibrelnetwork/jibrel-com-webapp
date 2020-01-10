import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import {Form} from 'react-final-form'
import {connect} from 'react-redux'
import pick from 'lodash-es/pick'
import get from 'lodash-es/get'
import { useI18n } from '@jibrelcom/languages'

import {
  BigButtonSubmit,
  Input,
  FileInput,
  HistoricDateInput,
} from '@jibrelcom/ui'
import KYCLayout from 'layouts/KYCLayout'
import isRequired from 'utils/validators/isRequired'

import {FormProps} from '../FormProps'
import style from '../style.scss'
import {handleAsyncValidationErrors} from '../handleAsyncValidationErrors'

const emptyFileField = {
    fileName: '',
    fileSize: 0,
    isLoading: false,
    error: '',
}

const CompanyInformationFormComponent: React.FunctionComponent<FormProps> = (props) => {
    const {
        backLabel, backHandler, nextLabel, nextHandler,
        formValues, uploadDocument, submit, documents,
    } = props

    const initialValues = pick(formValues, [
        'companyName', 'tradingName', 'dateOfIncorporation', 'placeOfIncorporation',
    ])

    const i18n = useI18n()
    return (
        <KYCLayout
            title={i18n._('KYC.Company.section.company.title')}
            backHandler={backHandler}
            backLabel={backLabel}
        >
          <div
            className={cc([
              grid.grid,
              style.company,
              style.background,
            ])}
          >
            <Form
                initialValues={initialValues}
                onSubmit={submit(nextHandler)}
                render={({handleSubmit, submitError}) => (
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
