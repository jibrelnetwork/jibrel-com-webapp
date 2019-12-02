import {
  Sprite,
  SpriteIcons,
} from './types'

import icons from './icons'

const DEFAULT_UI_KEY: string = 'ui'

const sprite: Sprite = {
  [DEFAULT_UI_KEY]: icons,
}

export function registerSprite(
  namespace: string,
  icons: SpriteIcons,
) {
  sprite[namespace] = icons
}

export function getSprite(namespace: string) {
  return sprite[namespace] || sprite[DEFAULT_UI_KEY]
}

export { SpriteIcon } from './types'
export { default as loadSprite } from './loadSprite'
