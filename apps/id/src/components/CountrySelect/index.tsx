import React from 'react'
import { Select } from '@jibrelcom/ui'

import COUNTRIES_INDEX from './countries/index.json'
import COUNTRIES_ORDER from './countries/order/en.json'
import COUNTRIES_TITLES from './countries/en.common.json'

const CountrySelect: React.FunctionComponent<any> = (props) => {
  const isWindowsSystem = navigator.platform.startsWith('Win')

  return (
    <Select.Select
      {...props}
    >
      {COUNTRIES_ORDER.map((id: string) => {
        const country = COUNTRIES_INDEX[id]
        const title = COUNTRIES_TITLES[`ref.country.${id}`]
        const flag = isWindowsSystem
          ? ''
          : `${country.flag} `

        return (
          <Select.Option
            key={country.id}
            title={title}
            value={country.id}
          >
            {flag + title}
          </Select.Option>
        )
      })}
    </Select.Select>
  )
}

export default CountrySelect
