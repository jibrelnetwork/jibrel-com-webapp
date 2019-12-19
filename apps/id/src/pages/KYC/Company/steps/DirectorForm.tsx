import KYCLayout from '../../../../layouts/KYCLayout'
import React from 'react'
import {useI18n} from "app/i18n"
import {Form} from 'react-final-form'

import {
    Input,
    BigButtonSubmit,
} from '@jibrelcom/ui'

export const DirectorForm = ({backLabel, backHandler, nextLabel, nextHandler}) => {
    const i18n = useI18n()
    const initialValues = {}
    return (
        <KYCLayout
            title={i18n._('KYC.Company.section.director.title')}
            backHandler={backHandler}
            backLabel={backLabel}
        >
            <Form
                initialValues={initialValues}
                onSubmit={nextHandler}
                render={() => (
                    <div>



                        <BigButtonSubmit onClick={nextHandler}>
                            {nextLabel}
                        </BigButtonSubmit>
                    </div>
                )}
            />
        </KYCLayout>
    )
}
