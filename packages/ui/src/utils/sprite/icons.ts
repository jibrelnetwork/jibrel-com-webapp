import loadSprite from './loadSprite'

import spriteColored from './spriteColored'
import spriteMonochrome from './spriteMonochrome'

const iconsColored = loadSprite(spriteColored, true)
const iconsMonochrome = loadSprite(spriteMonochrome)

const icons = {
  ...iconsColored,
  ...iconsMonochrome,
}

export default icons
