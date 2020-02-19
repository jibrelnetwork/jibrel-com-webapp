import React from 'react'
import { Select } from '@jibrelcom/ui'
import { useI18n } from '@jibrelcom/i18n'

type AmountSelectProps = Omit<React.ComponentProps<typeof Select.Select>, 'children'>

const AMOUNT_VALUES = [
  'Waitlist.form.amount.value1k',
  'Waitlist.form.amount.value10k',
  'Waitlist.form.amount.value20k',
  'Waitlist.form.amount.value50k',
  'Waitlist.form.amount.value100k',
]

const AmountSelect: React.FunctionComponent<AmountSelectProps> = (props) => {
  const i18n = useI18n()

  return (
    <Select.Select
      name='amount'
      label={i18n._('Waitlist.form.amount.label')}
      placeholder={i18n._('Waitlist.form.amount.placeholder')}
      {...props}
    >
      {AMOUNT_VALUES.map((amount: string) => {
        const value = i18n._(amount)

        return (
          <Select.Option
            key={value}
            label={value}
            value={value}
          >
            {value}
          </Select.Option>
        )
      })}
    </Select.Select>
  )
}

export default AmountSelect
