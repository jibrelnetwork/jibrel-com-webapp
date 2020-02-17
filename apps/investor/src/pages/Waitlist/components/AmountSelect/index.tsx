import React from 'react'
import { Select } from '@jibrelcom/ui'

type AmountSelectProps = Omit<React.ComponentProps<typeof Select.Select>, 'children'>

const AMOUNT_VALUES = [
  'USD 1,000 - 9,999',
  'USD 10,000 - 19,999',
  'USD 20,000 - 49,999',
  'USD 50,000 - 99,999',
  'USD 100,000 +',
]

const AmountSelect: React.FunctionComponent<AmountSelectProps> = (props) => (
  <Select.Select
    name='amount'
    label='Amount'
    placeholder='select approximate amount'
    {...props}
  >
    {AMOUNT_VALUES.map((amount: string) => (
        <Select.Option
          key={amount}
          label={amount}
          value={amount}
        >
          {amount}
        </Select.Option>
      ))}
  </Select.Select>
)

export default AmountSelect
