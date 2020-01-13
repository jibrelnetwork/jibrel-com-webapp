import React from 'react'
import cc from 'classcat'
import grid from '@jibrelcom/ui/src/Grid/grid.scss'
import { BigButton } from '@jibrelcom/ui'
import { useLanguageCode } from '@jibrelcom/languages'

import settings from 'app/settings'
import ProfileLayout from 'layouts/ProfileLayout'
import heroImage from 'public/images/pic_hero_invest_process.svg'

import style from './style.scss'

const Invest: React.FunctionComponent = () => {
  const languageCode = useLanguageCode()

  return (
    <ProfileLayout>
      <div
        className={cc([
          grid.grid,
          style.main,
        ])}
      >
        <img src={heroImage} className={style.hero} />
        <h1 className={style.title}>
          Thank you!<br />
          But the Princess Is in Another Castle.
        </h1>
        <div className={style.text}>
          You are using Jibrel in early access mode. We are working hard to deliver new features ASAP. You will be the first one to know when online investments are on. So please be patient and stay tuned!
        </div>
        <div className={style.actions}>
          <a
            className={style.button}
            href={`${settings.HOST_CMS}/${languageCode}`}
          >
            <BigButton>Return to Main</BigButton>
          </a>
        </div>
      </div>
    </ProfileLayout>
  )
}

export default Invest
