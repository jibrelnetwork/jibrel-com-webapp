import React from 'react'
import {useI18n} from 'app/i18n'
import reduce from 'lodash-es/reduce'
import isEmpty from 'lodash-es/isEmpty'
import {Form} from 'react-final-form'

import style from './style.scss'

import {
    BigButtonSubmit,
    Input,
    FileInput,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import {FormProps} from '../FormProps'
import {connect} from 'react-redux'


const checkEmptyFields = (values) =>
    reduce(values, (errors, value, field) => isEmpty(value)
        ? {...errors, [field]: 'Field value is required'}
        : errors
        , {})

const initialValues = {
    companyName: '',
    tradingName: '',
    dateOfIncorporation: '',
    placeOfIncorporation: '',
}

const CompanyInformationFormComponent: React.FunctionComponent<FormProps> = ({backLabel, backHandler, nextLabel, nextHandler, fieldValues, uploadDocument}) => {
    const {commercialRegister, shareholderRegister, articlesOfIncorporation} = fieldValues
    const i18n = useI18n()
    return (
        <KYCLayout
            title={i18n._('KYC.Company.section.company.title')}
            backHandler={backHandler}
            backLabel={backLabel}
        >
            <Form
                initialValues={initialValues}
                onSubmit={nextHandler}
                validate={checkEmptyFields}
                render={({hasValidationErrors, handleSubmit}) => (
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
                            onChange={(file: File) => uploadDocument({file, fieldName: 'commercialRegister'})}
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

                        <BigButtonSubmit disabled={hasValidationErrors}>
                            {nextLabel}
                        </BigButtonSubmit>
                    </form>
                )}
            />
        </KYCLayout>
    )
}

const mapDispatch = (dispatch) => ({
    uploadDocument: () => {
        console.log('File Upload Stub')
    },
})

export const CompanyInformationForm = connect(null, mapDispatch)(CompanyInformationFormComponent)
