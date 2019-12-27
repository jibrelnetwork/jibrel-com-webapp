import React from 'react'
import cc from 'classcat'
import { FormRenderProps } from 'react-final-form'

import {
  Checkbox,
  OtherSelect,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import settings from 'app/settings'
import OCCUPATIONS from 'data/occupations.json'
import INCOME_SOURCES from 'data/incomeSources.json'
import isRequired from 'utils/validators/isRequired'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import { useI18n } from 'app/i18n'
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
      className={cc([grid.column, style.form])}
    >
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
      <Checkbox
        name='isAgreedDocuments'
        validate={isRequired({ i18n })}
      >
        <span>
          I agree to Jibrel’s <a
            href={`${settings.HOST_CMS}/docs/en/risk-disclosures.pdf`}
            target='_blank'
          >
            Risk Disclosures
          </a>.
        </span>
      </Checkbox>
      <BigButtonSubmit
        className={style.submit}
      >
        Finish
      </BigButtonSubmit>
    </form>
  )
}

export default IncomeForm
