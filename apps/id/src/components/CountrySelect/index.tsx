import React from 'react'
import { Select } from '@jibrelcom/ui'

import COUNTRIES_INDEX from './countries/index.json'
import COUNTRIES_ORDER from './countries/order/en.json'
import COUNTRIES_TITLES from './countries/en.common.json'

type CountrySelectProps = Omit<React.ComponentProps<typeof Select.Select>, 'children'>

const CountrySelect: React.FunctionComponent<CountrySelectProps> = (props) => {
  const isWindowsSystem = navigator.platform.startsWith('Win')

  return (
    <Select.Select
      label={props.label}
      name={props.name}
      {...props}
    >
      {COUNTRIES_ORDER.map((id: string) => {
        const country = COUNTRIES_INDEX[id]
        const label = COUNTRIES_TITLES[`ref.country.${id}`]
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
}

export default CountrySelect
