import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import { LogoColor } from './types'

import logoBlue from '../public/logo/logoBlue.svg'
import logoGray from '../public/logo/logoGray.svg'
import logoWhite from '../public/logo/logoWhite.svg'

export interface LogoProps {
  color?: LogoColor;
  className?: string;
}

const LOGO_COLOR_MAP = {
  blue: logoBlue,
  gray: logoGray,
  white: logoWhite,
}

const Logo: React.FunctionComponent<LogoProps> = ({
  color = LogoColor.blue,
  className,
}) => {
  const i18n = useI18n()

  return (
    <img
      src={LOGO_COLOR_MAP[color]}
      className={className}
      alt={i18n._('layout.logo.alt')}
      width='128'
      height='32'
    />
  )
}

export default React.memo(Logo)