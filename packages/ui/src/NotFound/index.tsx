import React from 'react'
import cc from 'classcat'

import {
  Grid,
  BigButton,
} from '..'

import style from './style.scss'

export interface NotFoundProps {
  href: string;
}

const NotFound: React.FunctionComponent<NotFoundProps> = ({ href }) => (
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
      <h1 className='error__title'>It Looks Like You’re Lost</h1>
      <p className={cc(['error__description', style.text])}>
        This page is missing or you assembled the link incorrectly.
      </p>
      <div
        className={cc(['error__button', style.button])}
      >
        <BigButton
          href={href}
        >
          Back to main
        </BigButton>
      </div>
    </Grid.Item>
  </Grid.Container>
)

export default NotFound
