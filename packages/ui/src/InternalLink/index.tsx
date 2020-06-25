import React from 'react'
import cc from 'classcat'
import { Link } from 'react-router5'

import style from '../LinkButton/style.scss'

export interface InternalLinkProps extends React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  id?: string;
  params?: object;
  name: string;
  className?: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const InternalLink: React.FunctionComponent<InternalLinkProps> = ({
  params = { lang: 'en' },
  id,
  name,
  className,
  isDisabled = false,
  children,
  ...props
}) => (
  <Link
    {...props}
    id={id || `t_${name}`}
    routeParams={params}
    routeName={name}
    className={cc([
      style.link,
      style.button,
      isDisabled && style.disabled,
      className,
    ])}
  >
    <span className={style.text}>{children}</span>
  </Link>
)

export default React.memo(InternalLink)
