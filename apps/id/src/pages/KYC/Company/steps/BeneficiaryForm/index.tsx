import KYCLayout from 'layouts/KYCLayout'
import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {FieldArray} from 'react-final-form-arrays'
import {connect} from 'react-redux'

import {
    BigButtonSubmit,
    LinkButton,
} from '@jibrelcom/ui'

import {FormProps} from '../FormProps'
import style from '../style.scss'
import {handleAsyncValidationErrors} from '../handleAsyncValidationErrors'
import {BeneficiaryFields} from './BeneficiaryFields'

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
          <div
            className={cc([
              grid.grid,
              style.beneficiary,
              style.background,
            ])}
          >
            <Form
                initialValues={initialValues}
                mutators={{...arrayMutators}}
                onSubmit={submit(nextHandler)}
                render={({
                             handleSubmit,
                             submitError,
                             form: {
                                 mutators: {push}
                             },
                         }) => (
                    <form onSubmit={handleSubmit} className={style.step}>
                        <h2 className={style.title}>
                          Beneficiary
                        </h2>
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
            .validate({step: 3, ...values})
            .then(errors => {
                if (errors) {
                    return errors
                }

                return kycOrganization.addValues(values).then(callback)
            }),
})

export const BeneficiaryForm = connect(mapState, mapDispatch)(BeneficiaryFormComponent)
