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
          {i18n._('KYC.Personal.income.title')}
        </h2>
        <OtherSelect
          validate={isRequired({ i18n })}
          inputValidate={isRequired({ i18n })}
          options={OCCUPATIONS}
          label={i18n._('KYC.Personal.income.form.occupation.label')}
          placeholder={i18n._('KYC.Personal.income.form.occupation.placeholder')}
          name='occupation'
        />
        <OtherSelect
          validate={isRequired({ i18n })}
          inputValidate={isRequired({ i18n })}
          options={INCOME_SOURCES}
          label={i18n._('KYC.Personal.income.form.incomeSource.label')}
          placeholder={i18n._('KYC.Personal.income.form.incomeSource.placeholder')}
          name='incomeSource'
        />
      </div>
      <BigButtonSubmit className={style.submit}>
        {i18n._('KYC.form.action.finish')}
      </BigButtonSubmit>
    </form>
  )
}

export default IncomeForm
