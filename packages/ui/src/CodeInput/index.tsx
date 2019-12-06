import React from 'react'
import cc from 'classcat'
import MaskedInput from 'react-text-mask'

import style from '../Input/style.scss'

import { 
  withField,
  withFieldUX,
  withMessage,
} from '../FieldWrapper'

export interface CodeInputProps {
  label?: string;
  className?: string;
  hasError?: boolean;
}

const CodeInput: React.FunctionComponent<CodeInputProps> = ({
  className,
  label = 'Verification Code',
  hasError = false,
  ...props
}) => {
  return (
    <label className={cc([style.input, hasError && style.error, className])}>
      <MaskedInput
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
        showMask
        {...props}
        render={(ref, inputProps): React.ReactNode => (
          <input
            {...inputProps}
            ref={ref}
            className={cc([style.field, style.mask])}
          />
        )}
      />
      <div className={style.frame} />
      <p className={style.label}>{label}</p>
    </label>
  )
}

export default withField(withFieldUX(React.memo(withMessage(CodeInput))))
