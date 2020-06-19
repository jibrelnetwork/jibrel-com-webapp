import React from 'react'
import cc from 'classcat'
import { Icon } from '@jibrelcom/ui'
import { useI18n } from '@jibrelcom/i18n'

import style from './style.scss'
import { KYCType } from '../../types'

interface ButtonProps {
  setKYCType: (type: KYCType) => void;
  type: KYCType;
  iconName: string;
  description: string;
  isActive: boolean;
  id: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  setKYCType,
  type,
  iconName,
  description,
  isActive,
}) => {
  const i18n = useI18n()

  return (
    <button
      onClick={(): void => setKYCType(type)}
      className={cc([
        style.button,
        isActive && style.active,
      ])}
      type='button'
      id={`__${KYCType[type]}KYC`}
    >
      <Icon name={`ic_${iconName}_24`} className={style.icon} />
      <p className={style.title}>{i18n._(`KYC.Index.button.${KYCType[type]}`)}</p>
      <p className={style.description}>{description}</p>
    </button>
  )
}

export default Button
