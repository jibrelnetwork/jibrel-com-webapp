import assignWith from 'lodash-es/assignWith'

export type Settings = {
  DOMAIN: string;
  API_BASE_URL: string;
}

declare global {
  interface Window {
    SETTINGS: Settings;
  }
}

const settings: Settings = assignWith(
  {},
  {
    DOMAIN: process.env.DOMAIN,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  window.SETTINGS,
  (objValue, srcValue) => {
    if (srcValue === undefined) {
      return objValue
    }

    return srcValue.startsWith('{{')
      ? objValue
      : srcValue
  }
)

export default settings
