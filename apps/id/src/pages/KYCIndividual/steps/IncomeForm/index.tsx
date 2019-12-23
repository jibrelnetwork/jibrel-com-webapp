import React from 'react'
import cc from 'classcat'
import { FormRenderProps } from 'react-final-form'

import {
  Input,
  Checkbox,
  BigButtonSubmit,
} from '@jibrelcom/ui'

import isRequired from 'utils/validators/isRequired'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import { useI18n } from 'app/i18n'
import { KYCIndividualValues } from 'store/types/kyc'

import style from '../../style.scss'
import settings from 'app/settings'

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
      <Input
        validate={isRequired({ i18n })}
        name='occupation'
        label='Profession'
      />
      <Input
        validate={isRequired({ i18n })}
        name='incomeSource'
        label='Primary Source of Income'
      />
      <Checkbox
        name='terms'
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
