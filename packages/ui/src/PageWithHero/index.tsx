import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import grid from '../Grid/grid.scss'
import BigButton from '../BigButton'

export interface PageWithHero {
  text: string;
  href: string;
  title: string;
  imgSrc: string;
  buttonLabel: string;
}

const PageWithHero: React.FunctionComponent<PageWithHero> = ({
  text,
  href,
  title,
  imgSrc,
  buttonLabel,
}) => {

  return (
    <div
      className={cc([
        grid.grid,
        style.main,
      ])}
    >
      <img src={imgSrc} className={style.hero} />
      <h1 className={style.title}>{title}</h1>
      <div className={style.text}>{text}</div>
      <div className={style.actions}>
        <a
          className={style.button}
          href={href}
        >
          <BigButton>{buttonLabel}</BigButton>
        </a>
      </div>
    </div>
  )
}

export default PageWithHero
