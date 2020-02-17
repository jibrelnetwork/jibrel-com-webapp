import React from 'react'
import { Select } from '@jibrelcom/ui'

type AmountSelectProps = Omit<React.ComponentProps<typeof Select.Select>, 'children'>

const AMOUNT_VALUES = [
  'from $1,000 to $9,999',
  'from $10,000 to $19,999',
  'from $20,000 to $49,999',
  'from $50,000 to $99,999',
  '$100,000 or more',
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
