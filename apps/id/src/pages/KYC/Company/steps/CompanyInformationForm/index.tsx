import React from 'react'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'
import {connect} from 'react-redux'
import pick from 'lodash-es/pick'
import map from 'lodash-es/map'
import get from 'lodash-es/get'
import every from 'lodash-es/every'

import {
    BigButton,
    Input,
    FileInput,
} from '@jibrelcom/ui'
import KYCLayout from 'layouts/KYCLayout'

import {FormProps} from '../FormProps'
import {checkEmptyFields} from '../checkEmptyFieldsValidator'
import style from './style.scss'
import {handleAsyncValidationErrors} from '../handleAsyncValidationErrors'


const CompanyInformationFormComponent: React.FunctionComponent<FormProps> = (props) => {
    const {
        backLabel, backHandler, nextLabel, nextHandler,
        formValues, uploadDocument, submit,
        commercialRegister, shareholderRegister, articlesOfIncorporation,
    } = props

    const initialValues = pick(formValues, [
        'companyName', 'tradingName', 'dateOfIncorporation', 'placeOfIncorporation',
    ])

    const isAllFilesUploaded = every(map(
        [commercialRegister, shareholderRegister, articlesOfIncorporation],
        (field)=> get(field, 'id')
    ))

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
                validate={checkEmptyFields}
                render={({hasValidationErrors, handleSubmit, submitting}) => (
                    <form onSubmit={handleSubmit} className={style.step}>
                        <Input
                            name='companyName'
                            label={'Company Name'}
                        />
                        <Input
                            name='tradingName'
                            label={'Trading Name'}
                        />
                        <Input
                            name='dateOfIncorporation'
                            label={'Date of Incorporation'}
                            placeholder={'DD/MM/YYYY'}
                        />
                        <Input
                            name='placeOfIncorporation'
                            label={'Place of Incorporation'}
                        />

                        <h3 className={style.groupTitle}>
                            {'Company Documentation'}
                        </h3>

                        <FileInput
                            name='commercialRegister'
                            label={'Commercial Register'}
                            placeholder={'PNG, PDF, JPG'}
                            value={commercialRegister}
                            onChange={(file: File) => uploadDocument({file, fieldName: 'commercialRegister'})}
                            fileName={commercialRegister ? commercialRegister.fileName : ''}
                            fileSize={commercialRegister ? commercialRegister.fileSize : 0}
                            isLoading={commercialRegister ? commercialRegister.isLoading : false}
                            error={commercialRegister ? commercialRegister.error : ''}
                        />
                        <FileInput
                            name='shareholderRegister'
                            label={'Shareholder Register'}
                            placeholder={'PNG, PDF, JPG'}
                            onChange={(file: File) => uploadDocument({file, fieldName: 'shareholderRegister'})}
                            fileName={shareholderRegister ? shareholderRegister.fileName : ''}
                            fileSize={shareholderRegister ? shareholderRegister.fileSize : 0}
                            isLoading={shareholderRegister ? shareholderRegister.isLoading : false}
                            error={shareholderRegister ? shareholderRegister.error : ''}
                        />
                        <FileInput
                            name='articlesOfIncorporation'
                            label={'Article of Incorporation'}
                            placeholder={'PNG, PDF, JPG'}
                            onChange={(file: File) => uploadDocument({file, fieldName: 'articlesOfIncorporation'})}
                            fileName={articlesOfIncorporation ? articlesOfIncorporation.fileName : ''}
                            fileSize={articlesOfIncorporation ? articlesOfIncorporation.fileSize : 0}
                            isLoading={articlesOfIncorporation ? articlesOfIncorporation.isLoading : false}
                            error={articlesOfIncorporation ? articlesOfIncorporation.error : ''}
                        />

                        <BigButton isLoading={submitting} isDisabled={!isAllFilesUploaded || hasValidationErrors}>
                            {nextLabel}
                        </BigButton>
                    </form>
                )}
            />
        </KYCLayout>
    )
}

const mapState = ({kycOrganization, kyc}) => ({
    formValues: kycOrganization.values,

    // File upload fields with extra structure
    commercialRegister: kyc.fields.commercialRegister,
    shareholderRegister: kyc.fields.shareholderRegister,
    articlesOfIncorporation: kyc.fields.articlesOfIncorporation,
})

const mapDispatch = ({kyc, kycOrganizationValidate}) => ({
    uploadDocument: kyc.uploadDocument,
    submit: (callback) => (values) =>
        kycOrganizationValidate.validate({step: 0, ...values})
            .then(callback)
            .catch(handleAsyncValidationErrors),
})

export const CompanyInformationForm = connect(mapState, mapDispatch)(CompanyInformationFormComponent)
