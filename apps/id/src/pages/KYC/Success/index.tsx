import React from 'react'
import { BigButton } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/i18n'

import settings from 'app/settings'
import ProfileLayout from 'layouts/ProfileLayout'

import style from './style.scss'

const KYCSuccess: React.FunctionComponent = () => {
  const languageCode = useLanguageCode()

  return (
    <ProfileLayout>
      <div className={style.background}>
        <h1 className={style.title}>
          {'Success!'}
        </h1>

        <div className={style.content}>
          <h2 className={style.subtitle}>
            {'We\'re Verifying Your Identity'}
          </h2>
          <article className={style.article}>
            {'This will take from 1 to 3 business days. Once we have verified your details, you will receive a confirmation via email. Meanwhile, be sure to read more about Jibrel’s current investment opportunities.'}
          </article>
        </div>

        <BigButton
          component='a'
          className={style.submit}
          href={`${settings.HOST_CMS}/${languageCode}`}
        >
          Back to main
        </BigButton>
      </div>
    </ProfileLayout>
  )
}

export default KYCSuccess
