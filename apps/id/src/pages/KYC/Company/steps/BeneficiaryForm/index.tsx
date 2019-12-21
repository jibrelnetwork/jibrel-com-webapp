import KYCLayout from 'layouts/KYCLayout'
import React from 'react'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {FieldArray} from 'react-final-form-arrays'

import {
    BigButtonSubmit,
    LinkButton,
} from '@jibrelcom/ui'

import {FormProps} from '../FormProps'

import {BeneficiaryFields} from './BeneficiaryFields'
import style from './style.scss'
import {handleAsyncValidationErrors} from 'pages/KYC/Company/steps/handleAsyncValidationErrors'
import {connect} from 'react-redux'

const initialBeneficiaries = [{}]

export const BeneficiaryFormComponent: React.FunctionComponent<FormProps> = ({backLabel, backHandler, nextLabel, nextHandler, submit, uploadDocument, documents}) => {
    const i18n = useI18n()
    const initialValues = {}

    return (
        <KYCLayout
            title={i18n._('KYC.Company.section.beneficiary.title')}
            backHandler={backHandler}
            backLabel={backLabel}
        >
            <Form
                initialValues={initialValues}
                mutators={{...arrayMutators}}
                onSubmit={submit(nextHandler)}
                render={({
                             handleSubmit,
                             form: {
                                 mutators: {push}
                             },
                         }) => (
                    <form onSubmit={handleSubmit} className={style.step}>
                        <div className={style.caption}>
                            {'Any natural person who owns or controls, directly or indirectly, 25% or more of the shares or voting rights in the organization.'}
                        </div>
                        <FieldArray name="beneficiary" initialValue={initialBeneficiaries}>
                            {({fields}) =>
                                fields.map((name, index) => (
                                    <BeneficiaryFields
                                        isPrimary={index===0}
                                        key={name}
                                        index={index}
                                        deleteHandler={() => fields.remove(index)}
                                        documents={documents}
                                        uploadDocument={uploadDocument}
                                    />
                                ))
                            }
                        </FieldArray>

                        <LinkButton type="button" onClick={() => push('beneficiary', undefined)}>
                            + ADD MORE BENEFICIARIES
                        </LinkButton>

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
        kycOrganizationValidate.validate({step: 3, ...values})
            .then(callback)
            .catch(handleAsyncValidationErrors),
})

export const BeneficiaryForm = connect(mapState, mapDispatch)(BeneficiaryFormComponent)
