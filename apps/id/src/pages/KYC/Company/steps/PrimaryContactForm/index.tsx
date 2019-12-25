import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'
import get from 'lodash-es/get'
import {connect} from 'react-redux'
import pick from 'lodash-es/pick'

import {
    BigButtonSubmit,
    Input,
    FileInput,
  HistoricDateInput,
} from '@jibrelcom/ui'

import KYCLayout from 'layouts/KYCLayout'
import {CountrySelect} from 'components'
import {FormProps} from '../FormProps'
import isRequired from 'utils/validators/isRequired'

import {handleAsyncValidationErrors} from '../handleAsyncValidationErrors'
import style from '../style.scss'

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
          <div
            className={cc([
              grid.grid,
              style.contact,
              style.background,
            ])}
          >
            <Form
                initialValues={initialValues}
                onSubmit={submit(nextHandler)}
                render={({handleSubmit, submitError}) => (
                    <form onSubmit={handleSubmit} className={style.step}>
                        <h2 className={style.title}>
                            Primary Contact
                        </h2>
                        <h3 className={style.groupTitle}>
                            Personal Information
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
                        <HistoricDateInput
                            name='birthDate'
                            label={'Date of Birth'}
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
                            onUpload={uploadDocument}
                            {...(get(documents, 'proofOfAddressDocument',  emptyFileField))}
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
                        <HistoricDateInput
                            name='passportExpirationDate'
                            label={'Passport Expiration Date'}
                            validate={isRequired({i18n})}
                        />
                        <FileInput
                            name='passportDocument'
                            label={'Passport Front Page'}
                            placeholder={'PNG, PDF, JPG'}
                            onUpload={uploadDocument}
                            {...(get(documents, 'passportDocument',  emptyFileField))}
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
            .validate({step: 2, ...values})
            .then(errors => {
                if (errors) {
                    return errors
                }

                return kycOrganization.addValues(values).then(callback)
            }),
})

export const PrimaryContactForm = connect(mapState, mapDispatch)(PrimaryContactFormComponent)
