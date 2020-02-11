import React from 'react'
import COUNTRIES_INDEX from '@jibrelcom/countries/src/index.json'
import COUNTRIES_ORDER from '@jibrelcom/countries/src/order/en.json'
import COUNTRIES_TITLES from '@jibrelcom/countries/src/en.common.json'
import { Select } from '@jibrelcom/ui'

import {
  CountryRef,
  CountryCode,
} from '@jibrelcom/countries/src/types'

type CountrySelectProps = Omit<React.ComponentProps<typeof Select.Select>, 'children'>
const isWindowsSystem = navigator.platform.startsWith('Win')

const CountrySelect: React.FunctionComponent<CountrySelectProps> = (props) => (
  <Select.Select
    label={props.label}
    name={props.name}
    {...props}
  >
    {COUNTRIES_ORDER.map((id: CountryCode) => {
      const country = COUNTRIES_INDEX[id]
      const ref = CountryRef[id]
      const label = COUNTRIES_TITLES[ref]
      const flag = isWindowsSystem
        ? ''
        : `${country.flag} `

      return (
        <Select.Option
          key={country.id}
          label={label}
          value={country.id}
        >
          {flag + label}
        </Select.Option>
      )
    })}
  </Select.Select>
)


export default CountrySelect
