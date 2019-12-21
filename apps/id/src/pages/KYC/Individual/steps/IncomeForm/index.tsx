import React from 'react'
import cc from 'classcat'
import { FormRenderProps } from 'react-final-form'

import {
  Input,
  Checkbox,
  BigButton,
} from '@jibrelcom/ui'

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
          I agree to <a
            href='#'
          >
            Jibrel&apos;s Terms and Conditions
          </a>, <a
            href='#'
          >
            Privacy Policy
          </a> and <a
            href='#'
          >
            Risk Disclosures
          </a>.
        </span>
      </Checkbox>
      <BigButton
        type='submit'
        className={style.submit}
      >
        Finish
      </BigButton>
    </form>
  )
}

export default IncomeForm
