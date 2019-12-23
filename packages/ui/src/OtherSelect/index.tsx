import React from 'react'
import { useFormState } from 'react-final-form'

import { SelectProps } from '../Select/Select'

import {
  Input,
  Select,
} from '..'

export interface OtherSelectProps extends SelectProps {
  inputValidate: (value: string | void) => string | void;
  options: { [key: string]: string };
  inputLabel?: string;
}

const OTHER_VALUE = 'other'

const OtherSelect: React.FunctionComponent<OtherSelectProps> = (props) => {
  const {
    inputValidate,
    options,
    name,
    inputLabel,
  } = props

  const value = useFormState().values[name] || ''

  return (
    <>
      <Select.Select {...props}>
        {Object.keys(options).map((key: string) => (
          <Select.Option
            key={key}
            label={options[key]}
            value={key}
          >
            {options[key]}
          </Select.Option>
        ))}
      </Select.Select>
      {(value === OTHER_VALUE) && (
        <Input
          validate={inputValidate}
          label={inputLabel || 'Other'}
          name={`${name}Other`}
        />
      )}
    </>
  )
}

export default OtherSelect
