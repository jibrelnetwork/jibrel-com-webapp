import React from 'react'
import cc from 'classcat'

import style from './style.scss'
import grid from '../Grid/grid.scss'
import BigButton from '../BigButton'
import { BigButtonVariant } from '../BigButton/types'

export interface PageWithHero {
  children?: React.ReactNode;
  text: string;
  href?: string;
  title: string;
  imgSrc: string;
  className?: string;
  buttonLabel?: string;
  secondaryHref?: string;
  secondaryButtonLabel?: string;
}

const PageWithHero: React.FunctionComponent<PageWithHero> = ({
  children,
  href,
  text,
  title,
  imgSrc,
  className,
  buttonLabel,
  secondaryHref,
  secondaryButtonLabel,
}) => (
  <div
    className={cc([
      grid.grid,
      style.main,
      className,
    ])}
  >
    <img src={imgSrc} className={style.hero} />
    <h1 className={style.title}>{title}</h1>
    <div className={style.text}>{text}</div>
    {children && (
      <div className={style.content}>
        <div className={style.children}>{children}</div>
      </div>
    )}
    <div className={style.actions}>
      {(href && buttonLabel) && (
        <a
          href={href}
          className={style.button}
        >
          <BigButton>{buttonLabel}</BigButton>
        </a>
      )}
      {(secondaryHref && secondaryButtonLabel) && (
        <a
          href={secondaryHref}
          className={cc([
            style.button,
            style.secondary,
          ])}
        >
          <BigButton variant={BigButtonVariant.secondary}>
            {secondaryButtonLabel}
          </BigButton>
        </a>
      )}
    </div>
  </div>
)

export default PageWithHero
