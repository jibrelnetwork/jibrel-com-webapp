import React from 'react'
import cc from 'classcat'
import { Icon } from '@jibrelcom/ui'

import grid from '@jibrelcom/ui/src/theme/grid.scss'
import style from './style.scss'
import { KYCType } from '../../types'

interface ButtonProps {
  setKYCType: (type: KYCType) => void;
  type: KYCType;
  iconName: string;
  description: string;
  isActive: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  setKYCType,
  type,
  iconName,
  description,
  isActive,
}) => {
  return (
    <button
      onClick={(): void => setKYCType(type)}
      className={cc([
        style.button,
        isActive && style.active,
      ])}
      type='button'
    >
      <Icon name={`ic_${iconName}_24`} className={style.icon} />
      <p className={style.title}>{KYCType[type]}</p>
      <p className={style.description}>{description}</p>
    </button>
  )
}

export default Button
