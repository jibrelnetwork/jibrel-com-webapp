import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
import { FormRenderProps } from 'react-final-form'
import { column } from '@jibrelcom/ui/src/Grid/grid.scss'

import {
  OtherSelect,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import OCCUPATIONS from 'data/occupations.json'
import INCOME_SOURCES from 'data/incomeSources.json'
import isRequired from 'utils/validators/isRequired'
import { KYCIndividualValues } from 'store/types/kyc'

import style from '../../style.scss'

export interface IncomeFormProps {
  formProps: FormRenderProps<KYCIndividualValues>;
}

const IncomeForm: React.FunctionComponent<IncomeFormProps> = ({
  formProps,
}) => {
  const i18n = useI18n()

  return (
    <form
      onSubmit={formProps.handleSubmit}
      className={column}
    >
      <div className={style.form}>
        <h2 className={style.title}>
          Declaration of Source of Funds
        </h2>
        <OtherSelect
          validate={isRequired({ i18n })}
          inputValidate={isRequired({ i18n })}
          options={OCCUPATIONS}
          name='occupation'
          label='Profession'
          placeholder='select profession'
        />
        <OtherSelect
          validate={isRequired({ i18n })}
          inputValidate={isRequired({ i18n })}
          options={INCOME_SOURCES}
          name='incomeSource'
          label='Primary Source of Income'
          placeholder='select source of income'
        />
      </div>
      <BigButtonSubmit className={style.submit}>
        Finish
      </BigButtonSubmit>
    </form>
  )
}

export default IncomeForm
