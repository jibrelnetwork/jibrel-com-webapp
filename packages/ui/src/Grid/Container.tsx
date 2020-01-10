import React from 'react'
import cc from 'classcat'

import grid from './grid.scss'

interface GridContainerProps {
  component?: React.ComponentType | keyof JSX.IntrinsicElements;
  className?: string;
}

const GridContainer: React.FunctionComponent<GridContainerProps> = ({
  component = 'div',
  className,
  ...props
}) => {
  const Component = component

  return (
    <Component
      className={cc([
        grid.grid,
        className,
      ])}
      {...props}
    />
  )
}

export default GridContainer
