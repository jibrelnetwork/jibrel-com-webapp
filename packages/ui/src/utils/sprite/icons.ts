import loadSprite from './loadSprite'

import spritePlain from './spritePlain'
import spriteColored from './spriteColored'

const iconsPlain = loadSprite(spritePlain)
const iconsColored = loadSprite(spriteColored, true)

const icons = {
  ...iconsPlain,
  ...iconsColored,
}

export default icons
