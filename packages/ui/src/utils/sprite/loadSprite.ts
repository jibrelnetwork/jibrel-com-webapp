import { keyBy } from 'lodash-es'

import { SpriteIcon } from './types'

export default function loadSprite(
  sprite: any,
  isColored: boolean = false,
) {
  return keyBy<SpriteIcon, string>(
    sprite.keys().map((name: string) => {
      const file: SpriteIcon = sprite(name).default
      const [,, width, height] = file.viewBox.split(/(\s+)/).filter((e: string) => !!e.trim().length)
  
      file.width = width
      file.height = height

      if (isColored) {
        file.colored = true
      }
  
      return file
    }),
    'id',
  )
}
