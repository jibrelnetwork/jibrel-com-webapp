import React, {useState} from 'react'
import get from 'lodash-es/get'
import size from 'lodash-es/size'
import {router} from 'app/router'

import {
    CompanyInformationForm,
    RegisteredOfficeAddressForm,
    PrimaryContactForm,
    BeneficiaryForm,
    DirectorForm,
} from './steps'


const PROCESS_STEPS = [
    CompanyInformationForm,
    RegisteredOfficeAddressForm,
    PrimaryContactForm,
    BeneficiaryForm,
    DirectorForm,
]

const submit = () => console.log('Form submit')

const Company: React.FunctionComponent = () => {

    const fieldValues = {

    }

    // Fixme: initial 0 step
    const [currentStepNumber, setStep] = useState(4)

    const backHandler = currentStepNumber === 0
        ? () => router.navigate('KYC')
        : () => setStep(currentStepNumber - 1)

    const backLabel = currentStepNumber === 0
        ? 'BACK TO START'
        : 'PREVIOUS'

    const nextLabel = currentStepNumber === size(PROCESS_STEPS) - 1
        ? 'FINISH'
        : 'NEXT'

    const nextHandler = currentStepNumber === size(PROCESS_STEPS) - 1
        ? submit
        : () => setStep(currentStepNumber + 1)

    const Form = get(PROCESS_STEPS, currentStepNumber)

    return (<Form
        backLabel={backLabel}
        backHandler={backHandler}
        nextLabel={nextLabel}
        nextHandler={nextHandler}
        fieldValues={fieldValues}
    />)
}

export default Company
