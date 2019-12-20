import KYCLayout from 'layouts/KYCLayout'
import React from 'react'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {FieldArray} from 'react-final-form-arrays'
import isEqual from 'lodash-es/isEqual'

import {
    BigButtonSubmit,
    LinkButton,
} from '@jibrelcom/ui'

import {FormProps} from '../FormProps'

import {BeneficiaryFields} from './BeneficiaryFields'

const initialBeneficiaries = [{}]

export const BeneficiaryForm: React.FunctionComponent<FormProps> = ({backLabel, backHandler, nextLabel, nextHandler}) => {
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
                onSubmit={nextHandler}
                render={({
                             handleSubmit,
                             form: {
                                 mutators: {push}
                             },
                         }) => (
                    <form onSubmit={handleSubmit}>


                        <FieldArray name="beneficiary" isEqual={isEqual} initialValue={initialBeneficiaries}>
                            {({fields}) =>
                                fields.map((name, index) => (
                                    <BeneficiaryFields isPrimary={index===0} key={name} index={index}>
                                        {index !== 0 &&
                                        <LinkButton type="button" onClick={() => fields.remove(index)}>
                                          Remove Beneficiary
                                        </LinkButton>
                                        }
                                    </BeneficiaryFields>
                                ))
                            }
                        </FieldArray>

                        <LinkButton type="button" onClick={() => push('beneficiary', undefined)}>
                            + ADD MORE BENEFICIARIES
                        </LinkButton>

                        <BigButtonSubmit>
                            {nextLabel}
                        </BigButtonSubmit>
                    </form>
                )}
            />
        </KYCLayout>
    )
}
