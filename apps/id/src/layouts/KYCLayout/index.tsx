import React from 'react'
import cc from 'classcat'
import noop from 'lodash-es/noop'
import grid from '@jibrelcom/ui/src/theme/grid.scss'
import { LinkButton } from '@jibrelcom/ui'
import { LinkButtonVariant } from '@jibrelcom/ui/src/LinkButton/types'

import { useI18n } from 'app/i18n'

import style from './style.scss'
import ProfileLayout from '../ProfileLayout'

export interface KYCLayoutProps {
  backHandler?: () => void;
  children: React.ReactNode;
  title?: string;
  backLabel?: string;
}

const KYCLayout: React.FunctionComponent<KYCLayoutProps> = ({
  backHandler = noop,
  children,
  title = '',
  backLabel = '',
}) => {
  const i18n = useI18n()

  return (
    <ProfileLayout>
      <div className={grid.grid}>
        <h1
          className={cc([
            grid.column,
            style.title,
          ])}
        >
          {i18n._('KYC.Personal.title')}
        </h1>
        <div
          className={cc([
            grid.column,
            style.step,
          ])}
        >
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
        </div>
      </div>
    </ProfileLayout>
  )
}

export default KYCLayout
