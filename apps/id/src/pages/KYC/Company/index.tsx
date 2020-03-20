import React, { useState } from 'react'
import get from 'lodash-es/get'
import size from 'lodash-es/size'
import { router } from 'app/router'
import { useI18n } from '@jibrelcom/i18n'

import {
  CompanyInformationForm,
  RegisteredOfficeAddressForm,
  PrimaryContactForm,
  BeneficiaryForm,
  DirectorForm,
} from './steps'

const PROCESS_STEPS = [
  BeneficiaryForm,
  CompanyInformationForm,
  RegisteredOfficeAddressForm,
  PrimaryContactForm,
  DirectorForm,
]

const Company: React.FunctionComponent = () => {
  const i18n = useI18n()
  const [currentStepNumber, setStep] = useState(0)

  const backHandler = currentStepNumber === 0
    ? () => router.navigate('KYC')
    : () => setStep(currentStepNumber - 1)

  const backLabel = currentStepNumber === 0
    ? i18n._('KYC.form.action.start')
    : i18n._('KYC.form.action.prev')

  const nextLabel = currentStepNumber === size(PROCESS_STEPS) - 1
    ? i18n._('KYC.form.action.finish')
    : i18n._('KYC.form.action.next')

  const nextHandler = currentStepNumber === size(PROCESS_STEPS) - 1
    ? () => router.navigate('KYCSuccess')
    : () => setStep(currentStepNumber + 1)

  const Form = get(PROCESS_STEPS, currentStepNumber)

  return (
    <Form
      backLabel={backLabel}
      backHandler={backHandler}
      nextLabel={nextLabel}
      nextHandler={nextHandler}
    />
  )
}

export default Company
