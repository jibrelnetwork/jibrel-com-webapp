import { settings } from '@jibrelcom/core'

export type Settings = {
  DOMAIN_NAME: string;
  API_BASE_URL: string;
  ID_ORIGIN: string;
  INVESTOR_ORIGIN: string;
  CMS_ORIGIN: string;
}

declare global {
  interface Window {
    SETTINGS: {
      [key in keyof Settings]: string;
    };
  }
}

export default settings.init<Settings>(
  window.SETTINGS, {
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
    ID_ORIGIN: process.env.ID_ORIGIN,
    INVESTOR_ORIGIN: process.env.INVESTOR_ORIGIN,
    CMS_ORIGIN: process.env.CMS_ORIGIN,
  }, {
    API_BASE_URL: (value, values) => value
      ? value
      : `//api.${values.DOMAIN_NAME}`,
    ID_ORIGIN: (value, values) => value
      ? value
      : `//id.${values.DOMAIN_NAME}`,
    INVESTOR_ORIGIN: (value, values) => value
      ? value
      : `//investor.${values.DOMAIN_NAME}`,
    CMS_ORIGIN: (value, values) => value
      ? value
      : `//${values.DOMAIN_NAME}`,
  },
)
