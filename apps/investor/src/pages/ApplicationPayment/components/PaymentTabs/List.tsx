import React, {
  useState
} from 'react'

import {
  Grid
} from '@jibrelcom/ui'

import style from './style.scss'

import { ItemProps } from './Item'

type ItemElement = React.ReactElement<ItemProps>

interface ListProps {
  initialSelectedId?: string;
}

export const List: React.FunctionComponent<ListProps> = ({
  initialSelectedId,
  children,
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId)

  const tabs = React.Children.map(children, (child: ItemElement) =>
    React.cloneElement<ItemProps>(child, {
      isRenderedAsTab: true,
      isSelected: selectedId === child.props.id,
      onSelect: setSelectedId,
    })
  )

  const sections = React.Children.map(children, (child: ItemElement) =>
    React.cloneElement<ItemProps>(child, {
      isSelected: selectedId === child.props.id,
      onSelect: setSelectedId,
    })
  )

  return (
    <div>
      <Grid.Container component='ul' className={style.tabs}>
        {React.Children.map(tabs, (child) => (
          <Grid.Item
            component='li'
            className={style.tab}
            xs={4}
            s={4}
            m={4}
            l={3}
          >
            {child}
          </Grid.Item>
        ))}
      </Grid.Container>
      <div>
        {sections}
      </div>
    </div>
  )
}
