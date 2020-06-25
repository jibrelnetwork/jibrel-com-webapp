import React from 'react'
import { useI18n } from '@jibrelcom/i18n'
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
  id?: string;
  name?: string;
}

const OTHER_VALUE = 'other'

const OtherSelect: React.FunctionComponent<OtherSelectProps> = (props) => {
  const {
    inputValidate,
    id,
    options,
    name,
    inputLabel,
  } = props

  const i18n = useI18n()
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
          id={id || `t_${name}Input`}
          validate={inputValidate}
          name={`${name}Other`}
          label={inputLabel || i18n._('form.other.label')}
        />
      )}
    </>
  )
}

export default OtherSelect
