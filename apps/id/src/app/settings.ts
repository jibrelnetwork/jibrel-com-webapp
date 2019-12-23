import assignWith from 'lodash-es/assignWith'

export type Settings = {
  FRONTEND_ROOT_DOMAIN_NAME: string;
  API_BASE_URL: string;
  HOST_ID: string;
  HOST_CMS: string;
}

declare global {
  interface Window {
    SETTINGS: Settings;
  }
}

const settings: Settings = assignWith(
  {},
  {
    FRONTEND_ROOT_DOMAIN_NAME: process.env.FRONTEND_ROOT_DOMAIN_NAME,
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

settings.HOST_ID = `//id.${settings.FRONTEND_ROOT_DOMAIN_NAME}`
settings.HOST_CMS = `//${settings.FRONTEND_ROOT_DOMAIN_NAME}`

export default settings
