import React from 'react'
import { Select } from '@jibrelcom/ui'

type AmountSelectProps = Omit<React.ComponentProps<typeof Select.Select>, 'children'>

const AMOUNT_VALUES = {
  'USD 1,000 - 9,999': 'from $1,000 to $9,999',
  'USD 10,000 - 19,999': 'from $10,000 to $19,999',
  'USD 20,000 - 49,999': 'from $20,000 to $49,999',
  'USD 50,000 - 99,999': 'from $50,000 to $99,999',
  'USD 100,000 +': '$100,000 or more',
}

const AmountSelect: React.FunctionComponent<AmountSelectProps> = (props) => (
  <Select.Select
    name='amount'
    label='Amount'
    placeholder='select approximate amount'
    {...props}
  >
    {Object.keys(AMOUNT_VALUES).map((value: keyof typeof AMOUNT_VALUES) => (
        <Select.Option
          key={value}
          value={value}
          label={AMOUNT_VALUES[value]}
        >
          {AMOUNT_VALUES[value]}
        </Select.Option>
      ))}
  </Select.Select>
)

export default AmountSelect
