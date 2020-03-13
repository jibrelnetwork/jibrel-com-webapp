import assignWith from 'lodash-es/assignWith'

export type Settings = {
  FRONTEND_ROOT_DOMAIN_NAME: string;
  API_BASE_URL: string;
  HOST_ID: string;
  HOST_CMS: string;
  API_REQUEST_MAX_ATTEMPTS: number;
  FOLOOSI_MERCHANT_KEY: string;
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
    API_REQUEST_MAX_ATTEMPTS: process.env.API_REQUEST_MAX_ATTEMPTS,
    FOLOOSI_MERCHANT_KEY: process.env.FOLOOSI_MERCHANT_KEY,
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
settings.API_REQUEST_MAX_ATTEMPTS = parseInt(settings.API_REQUEST_MAX_ATTEMPTS.toString(), 10) || 0

export default settings
