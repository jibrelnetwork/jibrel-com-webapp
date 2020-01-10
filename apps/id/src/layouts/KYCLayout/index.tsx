import React from 'react'
import noop from 'lodash-es/noop'
import { LinkButton } from '@jibrelcom/ui'
import { useI18n } from '@jibrelcom/languages'
import { LinkButtonVariant } from '@jibrelcom/ui/src/LinkButton/types'

import style from './style.scss'
import ProfileLayout from '../ProfileLayout'

export interface KYCLayoutProps {
  backHandler?: () => void;
  children: React.ReactNode;
  backLabel?: string;
}

const KYCLayout: React.FunctionComponent<KYCLayoutProps> = ({
  backHandler = noop,
  children,
  backLabel = '',
}) => {
  const i18n = useI18n()

  return (
    <ProfileLayout>
      <h1 className={style.title}>
        {i18n._('KYC.title')}
      </h1>
      {!backLabel ? (<span className={style.back} />) : (
        <LinkButton
          onClick={backHandler}
          className={style.back}
          variant={LinkButtonVariant.prev}
        >
          {backLabel}
        </LinkButton>
      )}
      {children}
    </ProfileLayout>
  )
}

export default KYCLayout
