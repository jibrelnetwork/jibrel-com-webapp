import { settings } from '@jibrelcom/core'

export type Settings = {
  FRONTEND_ROOT_DOMAIN_NAME: string;
  API_BASE_URL: string;
  API_REQUEST_MAX_ATTEMPTS: number;
  CMS_ORIGIN: string;
  FOLOOSI_MERCHANT_KEY: string;
  ID_ORIGIN: string;
}

declare global {
  interface Window {
    SETTINGS: {
      [key in keyof Settings]: string;
    };
  }
}

export default settings.init<Settings>(
  window.SETTINGS,
  {
    FRONTEND_ROOT_DOMAIN_NAME: process.env.FRONTEND_ROOT_DOMAIN_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
    API_REQUEST_MAX_ATTEMPTS: process.env.API_REQUEST_MAX_ATTEMPTS,
    CMS_ORIGIN: process.env.CMS_ORIGIN,
    FOLOOSI_MERCHANT_KEY: process.env.FOLOOSI_MERCHANT_KEY,
    ID_ORIGIN: process.env.ID_ORIGIN,
  },
  {
    ID_ORIGIN: (_, values) => `//id.${values.FRONTEND_ROOT_DOMAIN_NAME}`,
    CMS_ORIGIN: (value, values) => value
        ? value
        : `//${values.FRONTEND_ROOT_DOMAIN_NAME}`,
    API_REQUEST_MAX_ATTEMPTS: (value) => parseInt(value.toString(), 10) || 0,
  }
)
