import React from 'react'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'
import {connect} from 'react-redux'
import pick from 'lodash-es/pick'
import get from 'lodash-es/get'

import {
    BigButtonSubmit,
    Input,
    FileInput,
} from '@jibrelcom/ui'
import KYCLayout from 'layouts/KYCLayout'

import {FormProps} from '../FormProps'
import style from './style.scss'
import {handleAsyncValidationErrors} from '../handleAsyncValidationErrors'
import isRequired from 'utils/validators/isRequired'

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
            <Form
                initialValues={initialValues}
                onSubmit={submit(nextHandler)}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit} className={style.step}>
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
                        <Input
                            name='dateOfIncorporation'
                            label={'Date of Incorporation'}
                            placeholder={'DD/MM/YYYY'}
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
                            onFileChange={(file: File) => uploadDocument({file, fieldName: 'commercialRegister'})}
                            {...(get(documents, 'commercialRegister', emptyFileField))}

                            validate={isRequired({i18n})}
                        />
                        <FileInput
                            name='shareholderRegister'
                            label={'Shareholder Register'}
                            placeholder={'PNG, PDF, JPG'}
                            onFileChange={(file: File) => uploadDocument({file, fieldName: 'shareholderRegister'})}
                            {...(get(documents, 'shareholderRegister', emptyFileField))}
                            validate={isRequired({i18n})}
                        />
                        <FileInput
                            name='articlesOfIncorporation'
                            label={'Article of Incorporation'}
                            placeholder={'PNG, PDF, JPG'}
                            onFileChange={(file: File) => uploadDocument({file, fieldName: 'articlesOfIncorporation'})}
                            {...(get(documents, 'articlesOfIncorporation', emptyFileField))}
                            validate={isRequired({i18n})}
                        />

                        <BigButtonSubmit className={style.submit}>
                            {nextLabel}
                        </BigButtonSubmit>
                    </form>
                )}
            />
        </KYCLayout>
    )
}

const mapState = ({kycOrganization, kyc}) => ({
    formValues: kycOrganization.values,
    documents: kyc.documents,
})

const mapDispatch = ({kyc, kycOrganizationValidate}) => ({
    uploadDocument: kyc.uploadDocument,
    submit: (callback) => (values) =>
        kycOrganizationValidate.validate({step: 0, ...values})
            .then(callback)
            .catch(handleAsyncValidationErrors),
})

export const CompanyInformationForm = connect(mapState, mapDispatch)(CompanyInformationFormComponent)
