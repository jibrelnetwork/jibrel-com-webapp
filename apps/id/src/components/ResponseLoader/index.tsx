import React from 'react'
import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import style from './style.scss'

export interface ResponseLoaderProps {
  loaderColor?: LoaderColor;
  children: React.ReactNode;
}

const ResponseLoader: React.FunctionComponent<ResponseLoaderProps> = ({
  loaderColor = Loader.color.Blue,
  children,
}) => {
  return (
    <div className={style.main}>
      <div className={style.loader}>
        <Loader color={loaderColor} />
      </div>
      <div className={style.content}>
        {children}
      </div>
    </div>
  )
}

export default ResponseLoader
