import React from 'react'
import cc from 'classcat'

import style from '@jibrelcom/ui/src/LinkButton/style.scss'

export interface InternalLinkProps extends React.PropsWithoutRef<JSX.IntrinsicElements['a']> {
  to: string;
  className?: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const InternalLink: React.FunctionComponent<InternalLinkProps> = ({
  to,
  className,
  isDisabled = false,
  children,
  ...props
}) => (
  <a
    {...props}
    href={__DEV__ ? `/id${to}` : to}
    className={cc([
      style.button,
      isDisabled && style.disabled,
      className,
    ])}
  >
    <span className={style.text}>{children}</span>
  </a>
)

export default React.memo(InternalLink)
