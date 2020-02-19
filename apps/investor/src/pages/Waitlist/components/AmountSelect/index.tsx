import React from 'react'
import { Select } from '@jibrelcom/ui'
import { useI18n } from '@jibrelcom/i18n'

type AmountSelectProps = Omit<React.ComponentProps<typeof Select.Select>, 'children'>

const AMOUNT_VALUES = {
  'USD 1,000 - 9,999': 'Waitlist.form.amount.value1k',
  'USD 10,000 - 19,999': 'Waitlist.form.amount.value10k',
  'USD 20,000 - 49,999': 'Waitlist.form.amount.value20k',
  'USD 50,000 - 99,999': 'Waitlist.form.amount.value50k',
  'USD 100,000 +': 'Waitlist.form.amount.value100k',
}

const AmountSelect: React.FunctionComponent<AmountSelectProps> = (props) => {
  const i18n = useI18n()

  return (
    <Select.Select
      name='amount'
      label={i18n._('Waitlist.form.amount.label')}
      placeholder={i18n._('Waitlist.form.amount.placeholder')}
      {...props}
    >
      {Object.keys(AMOUNT_VALUES).map((key: keyof typeof AMOUNT_VALUES) => {
        const label = i18n._(AMOUNT_VALUES[key])

        return (
          <Select.Option
            key={key}
            value={key}
            label={label}
          >
            {label}
          </Select.Option>
        )
      })}
    </Select.Select>
  )
}

export default AmountSelect
