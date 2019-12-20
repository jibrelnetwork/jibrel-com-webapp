import React from 'react'
import {
    Input,
} from '@jibrelcom/ui'
import {Field} from 'react-final-form'


interface BeneficiaryFieldsProps {
    isPrimary: boolean;
    index?: number;
    children?: React.ReactNode;
}

export const BeneficiaryFields: React.FunctionComponent<BeneficiaryFieldsProps>  = ({isPrimary, index = 0, children}) => (
    <section>
        {isPrimary
            ? <h2>Beneficiary</h2>
            : <h2>Beneficiary #{index}</h2>
        }

        <h3>Personal Information</h3>
        <Field
            component={Input}
            name={`beneficiary[${index}].name`}
            label="Full Legal Name"
        />

        {children}
    </section>
)
