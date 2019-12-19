import React, {useState} from 'react'
import get from 'lodash-es/get'
import size from 'lodash-es/size'

import {
    BeneficiaryForm,
    CompanyInformationForm,
    DirectorForm,
    PrimaryContactForm,
    RegisteredOfficeAddressForm
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
    // const i18n = useI18n()
    // const initialValues = {}

    const [currentStepNumber, setStep] = useState(0)

    const backHandler = currentStepNumber === 0
        ? () => console.log('Back to start')
        : () => setStep(currentStepNumber - 1)

    const backLabel = currentStepNumber === 0
        ? 'BACK TO START'
        : 'PREVIOUS'

    const nextLabel = currentStepNumber === size(PROCESS_STEPS) - 1
        ? 'FINISH'
        : 'NEXT'

    const nextHandler = currentStepNumber === size(PROCESS_STEPS) - 1
        ? submit
        : (formValues: any) => {
            setStep(currentStepNumber + 1)
            console.log('Step submitted:', formValues)
        }

    const Form = get(PROCESS_STEPS, currentStepNumber)

    return (<Form
        backLabel={backLabel}
        backHandler={backHandler}
        nextLabel={nextLabel}
        nextHandler={nextHandler}
    />)
}

export default Company
