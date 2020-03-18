import { loadSprite } from '@jibrelcom/ui'

import spriteMonochrome from './spriteMonochrome'
import spriteColored from './spriteColored'

const iconsMonochrome = loadSprite(spriteMonochrome)
const iconsColored = loadSprite(spriteColored)

const icons = {
  ...iconsMonochrome,
  ...iconsColored,
}

export default icons
