export type SpriteIcon = {
  id: string,
  url: string,
  width: string,
  height: string,
  viewBox: string,
  colored?: boolean,
}

export type SpriteIcons = { [id: string]: SpriteIcon }
export type Sprite = { [namespace: string]: SpriteIcons }
