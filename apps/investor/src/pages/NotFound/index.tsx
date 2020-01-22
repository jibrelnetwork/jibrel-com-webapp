import React from 'react'
import cc from 'classcat'

import {
  Grid,
  BigButton,
} from '@jibrelcom/ui'

import settings from 'app/settings'

import style from './style.scss'

const NotFound: React.FunctionComponent = () => (
  <Grid.Container>
    <article className={cc(['error', style.main])}>
      <img
        src={`${settings.HOST_CMS}/img/pic_hero_404_error.png`}
        alt='404 Not Found'
        className='error__hero'
      />
      <h1 className='error__title'>It Looks Like You’re Lost</h1>
      <p className={cc(['error__description', style.text])}>
        This page is missing or you assembled the link incorrectly.
      </p>
      <a
        href={settings.HOST_CMS}
        className={cc(['error__button', style.button])}
      >
        <BigButton>Back to main</BigButton>
      </a>
    </article>
  </Grid.Container>
)

export default NotFound
