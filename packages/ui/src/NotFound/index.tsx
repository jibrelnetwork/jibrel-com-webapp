import React, { useEffect } from 'react'
import cc from 'classcat'
import { useI18n } from '@jibrelcom/i18n'
import noop from 'lodash-es/noop'

import {
  Grid,
  BigButton,
} from '..'

import style from './style.scss'

export interface NotFoundProps {
  requestProfile?: () => void;
  host: string;
}

const NotFound: React.FunctionComponent<NotFoundProps> = ({
  requestProfile = noop,
  host,
}) => {
  const i18n = useI18n()

  useEffect(() => {
    requestProfile()
  }, [])

  return (
    <Grid.Container>
      <Grid.Item
        component='article'
        className={cc(['error', style.main])}
      >
        <img
          src={`${host}/img/pic_hero_404_error.png`}
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
            id='t_backToMain'
            component='a'
            href={host}
          >
            {i18n._('NotFound.button')}
          </BigButton>
        </div>
      </Grid.Item>
    </Grid.Container>
  )
}

export default NotFound
