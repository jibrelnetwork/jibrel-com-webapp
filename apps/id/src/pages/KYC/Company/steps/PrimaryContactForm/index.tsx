import React from 'react'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'

import {
    BigButtonSubmit,
    Input,
    FileInput,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import {FormProps} from '../FormProps'
import pick from 'lodash-es/pick'
import style from 'pages/KYC/Company/steps/CompanyInformationForm/style.scss'
import {handleAsyncValidationErrors} from 'pages/KYC/Company/steps/handleAsyncValidationErrors'
import {connect} from 'react-redux'
import {CountrySelect} from 'components'
import isRequired from 'utils/validators/isRequired'
import get from 'lodash-es/get'

const emptyFileField = {
    fileName: '',
    fileSize: 0,
    isLoading: false,
    error: '',
}

export const PrimaryContactFormComponent: React.FunctionComponent<FormProps> = (props) => {
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
            title={i18n._('KYC.Company.section.primaryContact.title')}
            backHandler={backHandler}
            backLabel={backLabel}
        >
            <Form
                initialValues={initialValues}
                onSubmit={submit(nextHandler)}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit} className={style.step}>

                        <h3 className={style.groupTitle}>
                            {'Personal Information'}
                        </h3>
                        <Input
                            name='firstName'
                            label={'First Name'}
                            validate={isRequired({i18n})}
                        />
                        <Input
                            name='lastName'
                            label={'Last Name'}
                            validate={isRequired({i18n})}
                        />
                        <Input
                            name='middleName'
                            label={'Middle Name (Optional)'}
                        />
                        <Input
                            name='birthDate'
                            label={'Date of Birth'}
                            placeholder={'DD/MM/YYYY'}
                            validate={isRequired({i18n})}
                        />
                        <CountrySelect
                            name='nationality'
                            label={'Nationality'}
                            placeholder={'select nationality'}
                            validate={isRequired({i18n})}
                        />

                        <h3 className={style.groupTitle}>
                            {'Current Residential Address'}
                        </h3>

                        <Input
                            name='phoneNumber'
                            label={'Primary Telephone'}
                            validate={isRequired({i18n})}
                            // FIXME: So is it optional or not?
                            // label={'Primary Telephone (Optional)'}
                        />
                        <Input
                            name='email'
                            label={'Email'}
                            validate={isRequired({i18n})}
                        />
                        <Input
                            name='streetAddress'
                            label={'Street Address'}
                            validate={isRequired({i18n})}
                        />
                        <Input
                            name='apartment'
                            label={'Apartment, Unit or Suite (Optional)'}
                        />
                        <Input
                            name='city'
                            label={'City'}
                            validate={isRequired({i18n})}
                        />
                        <Input
                            name='postCode'
                            label={'Post Code (Optional)'}
                        />
                        <CountrySelect
                            name='country'
                            label={'Country of Residency'}
                            placeholder={'select country'}
                            validate={isRequired({i18n})}
                        />

                        <FileInput
                            name='proofOfAddressDocument'
                            label={'Proof of Address (Utility Bill, Bank Statement)'}
                            placeholder={'PNG, PDF, JPG'}
                            onFileChange={(file: File) => uploadDocument({file, fieldName: 'proofOfAddressDocument'})}
                            {...(get(documents, `proofOfAddressDocument`,  emptyFileField))}
                            validate={isRequired({i18n})}
                        />

                        <h3 className={style.groupTitle}>
                            {'Personal ID'}
                        </h3>
                        <Input
                            name='passportNumber'
                            label={'Passport Number'}
                            validate={isRequired({i18n})}
                        />
                        <Input
                            name='passportExpirationDate'
                            label={'Passport Expiration Date'}
                            placeholder={'DD/MM/YYYY'}
                            validate={isRequired({i18n})}
                        />
                        <FileInput
                            name='passportDocument'
                            label={'Passport Front Page'}
                            placeholder={'PNG, PDF, JPG'}
                            onFileChange={(file: File) => uploadDocument({file, fieldName: 'passportDocument'})}
                            {...(get(documents, `passportDocument`,  emptyFileField))}
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

    // File upload fields with extra structure
    documents: kyc.documents,
})

const mapDispatch = ({kyc, kycOrganization, kycOrganizationValidate}) => ({
    uploadDocument: kyc.uploadDocument,
    submit: (callback) => (values) =>
        kycOrganizationValidate
            .validate({step: 2, ...values})
            .then(() => kycOrganization.addValues(values))
            .then(callback)
            .catch(handleAsyncValidationErrors),
})

export const PrimaryContactForm = connect(mapState, mapDispatch)(PrimaryContactFormComponent)
