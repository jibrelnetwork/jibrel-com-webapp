import { settings } from '@jibrelcom/core'

export type Settings = {
  DOMAIN_NAME: string;
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
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    API_BASE_URL: `//api.${process.env.DOMAIN_NAME}`,
    API_REQUEST_MAX_ATTEMPTS: process.env.API_REQUEST_MAX_ATTEMPTS,
    FOLOOSI_MERCHANT_KEY: process.env.FOLOOSI_MERCHANT_KEY,
    ID_ORIGIN: `//id.${process.env.DOMAIN_NAME}`,
    CMS_ORIGIN: `//${process.env.DOMAIN_NAME}`,
  },
)
