import React from 'react'
import cc from 'classcat'
import { useI18n } from '@jibrelcom/i18n'

import {
  Grid,
  BigButton,
} from '..'

import style from './style.scss'

export interface NotFoundProps {
  href: string;
}

const NotFound: React.FunctionComponent<NotFoundProps> = ({ href }) => {
  const i18n = useI18n()

  return (
    <Grid.Container>
      <Grid.Item
        component='article'
        className={cc(['error', style.main])}
      >
        <img
          src={`${href}/img/pic_hero_404_error.png`}
          alt='404 Not Found'
          className='error__hero'
        />
        <h1 className='error__title'>
          {i18n._('NotFound.title')}
        </h1>
        <p className={cc(['error__description', style.text])}>
          {i18n._('NotFound.description')}
        </p>
        <div
          className={cc(['error__button', style.button])}
        >
          <BigButton
            component='a'
            href={href}
          >
            {i18n._('NotFound.button')}
          </BigButton>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default NotFound
