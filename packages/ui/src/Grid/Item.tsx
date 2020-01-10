import React from 'react'
import cc from 'classcat'

import grid from './grid.scss'

interface GridItemProps {
  component?: React.ComponentType | keyof JSX.IntrinsicElements;
  className?: string;
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
}

const GridItem: React.FunctionComponent<GridItemProps> = ({
  component = 'div',
  className,
  xs = 4,
  s,
  m,
  l,
  xl,
  ...props
}) => {
  const Component = component

  return (
    <Component
      className={cc([
        grid.column,
        grid[`xs-${xs}`],
        grid[`s-${s}`],
        grid[`m-${m}`],
        grid[`l-${l}`],
        grid[`xl-${xl}`],
        className,
      ])}
      {...props}
    />
  )
}

export default GridItem
