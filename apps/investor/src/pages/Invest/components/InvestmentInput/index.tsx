import React from 'react'
import cc from 'classcat'

import style from './style.scss'

export interface InputProps {
    className?: string;
    isDisabled?: boolean;
}

const InvestmentInput: React.FunctionComponent<InputProps> = ({
    className,
    isDisabled,
    ...props
}) => (
  <div className={cc([style.wrapper, className])}>
      <div className={cc([style.symbol])}>$</div>
      <input
          {...props}
          className={style.input}
          disabled={isDisabled}
          inputMode="numeric"
          pattern="[0-9]*"
          type='text'
      />
  </div>
)

export default React.memo(InvestmentInput)
