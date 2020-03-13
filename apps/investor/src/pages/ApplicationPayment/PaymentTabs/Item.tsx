import React from 'react'
import noop from 'lodash-es/noop'
import cc from 'classcat'

import {
  Icon,
  Label,
} from '@jibrelcom/ui'
import { useI18n } from '@jibrelcom/i18n'

import style from './style.scss'

export interface ItemProps {
  id: string;
  title: string;
  icon: string;
  isSelected?: boolean;
  isRenderedAsTab?: boolean;
  isDisabled?: boolean;
  onSelect?: (id: string) => void;
}

export const Item: React.FunctionComponent<ItemProps> = ({
  id,
  title,
  icon,
  isSelected = false,
  isRenderedAsTab = false,
  isDisabled = false,
  onSelect = noop,
  children,
}) => {
  const i18n = useI18n()

  if (isRenderedAsTab) {
    const onClick = isDisabled
      ? (event: React.MouseEvent): void => event.preventDefault()
      : (): void => onSelect(id)

    return (
      <a
        href={`#${id}`}
        onClick={onClick}
        className={cc([
          style.button,
          isSelected && style.isSelected,
          isDisabled && style.isDisabled,
        ])}
        aria-disabled={isDisabled}
      >
        <Icon name={icon} className={style.icon} />
        {isDisabled && (
          <Label
            className={style.label}
            color={Label.color.Blue}
          >
            {i18n._('ApplicationPayment.Methods.soon')}
          </Label>
        )}
        <h3 className={style.title}>{title}</h3>
      </a>
    )
  }

  return (
    <section
      id={id}
      className={cc([
        style.section,
        isSelected && style.isSelected,
      ])}
    >
      {children}
    </section>
  )
}
