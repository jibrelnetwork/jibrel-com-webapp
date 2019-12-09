import React from 'react'
import cc from 'classcat'
import MaskedInput from 'react-text-mask'

import style from '../Input/style.scss'

import { 
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface PhoneInputProps {
  ccc: string;
  label?: string;
  className?: string;
  hasError?: boolean;
}

const PhoneInput: React.FunctionComponent<PhoneInputProps> = ({
  ccc,
  className,
  label = 'Phone Number',
  hasError = false,
  ...props
}) => {
  return (
    <label
      className={cc([
        style.input,
        style.phone,
        hasError && style.error,
        className,
      ])}
    >
      <span className={style.ccc}>
        {ccc}
      </span>
      <MaskedInput
        placeholderChar=' '
        mask={['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        {...props}
        render={(ref, inputProps): React.ReactNode => (
          <input
            {...inputProps}
            ref={ref}
            className={cc([
              style.field,
              style.mask,
            ])}
          />
        )}
      />
      <div className={style.frame} />
      <p className={style.label}>{label}</p>
    </label>
  )
}

export default withField(withFieldUX(React.memo(withMessage(PhoneInput))))
