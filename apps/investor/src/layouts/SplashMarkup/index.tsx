import React from 'react'
import cc from 'classcat'

import { Grid } from '@jibrelcom/ui'

import style from './style.scss'

export interface SplashMarkupProps {
  children?: React.ReactNode;
  title?: string;
  text?: string;
  header: JSX.Element;
  className?: string;
}

const SplashMarkup: React.FunctionComponent<SplashMarkupProps> = ({
  children,
  text,
  title,
  header,
  className,
}) => (
  <Grid.Item
    className={cc([
      style.main,
      className,
    ])}
  >
    <div className={style.header}>{React.cloneElement(header)}</div>
    <h1 className={style.title}>{title}</h1>
    <div className={style.text}>{text}</div>
    {children && (
      <div className={style.content}>
        <div className={style.children}>{children}</div>
      </div>
    )}
  </Grid.Item>
)

export default React.memo(SplashMarkup)
