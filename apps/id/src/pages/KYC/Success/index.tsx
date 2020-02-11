import React from 'react'
import { BigButton } from '@jibrelcom/ui'

import {
  useI18n,
  useLanguageCode,
} from '@jibrelcom/i18n'

import settings from 'app/settings'
import ProfileLayout from 'layouts/ProfileLayout'

import style from './style.scss'

const Success: React.FunctionComponent = () => {
  const i18n = useI18n()
  const languageCode = useLanguageCode()

  return (
    <ProfileLayout>
      <div className={style.background}>
        <h1 className={style.title}>
          {i18n._('KYC.Success.title')}
        </h1>
        <div className={style.content}>
          <h2 className={style.subtitle}>
            {i18n._('KYC.Success.subtitle')}
          </h2>
          <article className={style.article}>
            {i18n._('KYC.Success.message')}
          </article>
        </div>
        <BigButton
          component='a'
          className={style.submit}
          href={`${settings.HOST_CMS}/${languageCode}`}
        >
          {i18n._('KYC.Success.action')}
        </BigButton>
      </div>
    </ProfileLayout>
  )
}

export default Success
