import { keyBy } from 'lodash-es'

import { SpriteIcon } from './types'

import spritePlain from './spritePlain'
import spriteColored from './spriteColored'

const iconsPlain = keyBy<SpriteIcon, string>(
  spritePlain.keys().map((name: string) => {
    const file: SpriteIcon = spritePlain(name).default
    const [,, width, height] = file.viewBox.split(/(\s+)/).filter((e: string) => !!e.trim().length)

    /* eslint-disable fp/no-mutation */
    file.width = width
    file.height = height
    /* eslint-enable fp/no-mutation */

    return file
  }),
  'id',
)

const iconsColored = keyBy<SpriteIcon, string>(
  spriteColored.keys().map((name: string) => {
    const file: SpriteIcon = spriteColored(name).default
    const [,, width, height] = file.viewBox.split(/(\s+)/).filter((e: string) => !!e.trim().length)

    /* eslint-disable fp/no-mutation */
    file.width = width
    file.height = height
    file.colored = true
    /* eslint-enable fp/no-mutation */

    return file
  }),
  'id',
)

const icons = {
  ...iconsPlain,
  ...iconsColored,
}

export default icons
