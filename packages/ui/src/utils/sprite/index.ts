import {
  Sprite,
  SpriteIcons,
} from './types'

import icons from './icons'

export const DEFAULT_UI_KEY: string = 'ui'
export const DEFAULT_ALL_KEY: string = 'all'

const sprite: Sprite = {
  [DEFAULT_UI_KEY]: icons,
  [DEFAULT_ALL_KEY]: icons,
}

export function registerSprite(
  namespace: string,
  icons: SpriteIcons,
) {
  sprite[namespace] = icons

  sprite[DEFAULT_ALL_KEY] = {
    ...sprite[DEFAULT_ALL_KEY],
    ...icons,
  }
}

export function getSprite(namespace: string = DEFAULT_ALL_KEY) {
  return sprite[namespace] || sprite[DEFAULT_ALL_KEY]
}

export { SpriteIcon } from './types'
export { default as loadSprite } from './loadSprite'
