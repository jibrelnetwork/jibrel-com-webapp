import React from 'react'

import cc from 'classcat'

import grid from './grid.scss'
import example from './example.scss'

export default () => (
  <div className={grid.grid}>
    <div
      className={cc([
        grid.column,
        example.first,
      ])}
    >
      <div className={example.inside} />
    </div>
    <div
      className={cc([
        grid.column,
        example.second,
      ])}
    >
      <div className={example.inside} />
    </div>
    <div
      className={cc([
        grid.column,
        example.third,
      ])}
    >
      <div className={example.inside} />
    </div>
  </div>
)
