import KYCLayout from 'layouts/KYCLayout'
import React from 'react'
import {useI18n} from 'app/i18n'
import {Form} from 'react-final-form'

import {
    BigButtonSubmit,
} from '@jibrelcom/ui'

import {FormProps} from '../FormProps'

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
                onSubmit={nextHandler}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>


                        <BigButtonSubmit onClick={nextHandler}>
                            {nextLabel}
                        </BigButtonSubmit>
                    </form>
                )}
            />
        </KYCLayout>
    )
}
