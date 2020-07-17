import identity from 'lodash-es/identity'

export type StringSettings<S> = {
  [key in keyof S]: string;
}

type WindowSettings<S> = StringSettings<S>

type EnvSettings<S> = {
  [key in keyof S]?: string;
}

export type InProgressSettings<S> = {
  [key in keyof S]: string | S[key];
}

type TransformFunction<S, SValue> = (value: string | SValue, values: InProgressSettings<S>) => SValue

export type SettingsTransforms<S> = {
  [key in keyof S]?: TransformFunction<S, S[key]>;
}

const getValidConfigValue = (windowValue: string, envValue: string | undefined): string => {
  if (!windowValue || windowValue.startsWith('{{')) {
    return envValue || ''
  }

  return windowValue
}

const transformOrIdentity = (transform: undefined | Function): Function =>
  transform
    ? transform
    : identity

export const init = <S>(fromWindow: WindowSettings<S>, fromEnv: EnvSettings<S>, transforms?: SettingsTransforms<S>): S => {
  const keys = Object.keys({...fromWindow, ...fromEnv}) as Array<keyof S>

  const settings = keys.reduce((memo, key) => {
    memo[key] = getValidConfigValue(fromWindow[key], fromEnv[key])

    return memo
  }, {} as StringSettings<S>)

  if (transforms === undefined) {
    return settings as unknown as S
  }

  return keys.reduce((memo, key) => {
    memo[key] = transformOrIdentity(transforms[key])(memo[key], memo)

    return memo
  }, settings as InProgressSettings<S>) as S
}

export default {
  init,
}
