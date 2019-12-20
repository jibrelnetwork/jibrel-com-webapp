import React from 'react'
import noop from 'lodash-es/noop'
import { LinkButton } from '@jibrelcom/ui'
import { LinkButtonVariant } from '@jibrelcom/ui/src/LinkButton/types'

import { useI18n } from 'app/i18n'

import style from './style.scss'
import ProfileLayout from '../ProfileLayout'

export interface KYCLayoutProps {
  backHandler?: () => void;
  children: React.ReactNode;
  title: string;
  backLabel?: string;
}

const KYCLayout: React.FunctionComponent<KYCLayoutProps> = ({
  backHandler = noop,
  children,
  title,
  backLabel = '',
}) => {
  const i18n = useI18n()

  return (
    <ProfileLayout>
      <h1
        className={style.title}
      >
        {i18n._('KYC.Personal.title')}
      </h1>
      <LinkButton
        onClick={backHandler}
        className={style.back}
        variant={backLabel ? LinkButtonVariant.prev : undefined}
      >
        {backLabel}
      </LinkButton>
      <h2 className={style.subtitle}>
        {title}
      </h2>
      {children}
    </ProfileLayout>
  )
}

export default KYCLayout
