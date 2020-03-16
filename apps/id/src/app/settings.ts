import { settings } from '@jibrelcom/core'

export type Settings = {
  FRONTEND_ROOT_DOMAIN_NAME: string;
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
  window.SETTINGS,
  {
    FRONTEND_ROOT_DOMAIN_NAME: process.env.FRONTEND_ROOT_DOMAIN_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
    ID_ORIGIN: process.env.ID_ORIGIN,
    INVESTOR_ORIGIN: process.env.INVESTOR_ORIGIN,
    CMS_ORIGIN: process.env.CMS_ORIGIN,
  },
  {
    ID_ORIGIN: (_, values) => `//id.${values.FRONTEND_ROOT_DOMAIN_NAME}`,
    INVESTOR_ORIGIN: (_, values) => `//investor.${values.FRONTEND_ROOT_DOMAIN_NAME}`,
    CMS_ORIGIN: (_, values) => `//${values.FRONTEND_ROOT_DOMAIN_NAME}`,
  }
)
