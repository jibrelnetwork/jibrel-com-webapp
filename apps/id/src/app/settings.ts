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
  window.SETTINGS,
  {
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    API_BASE_URL: `//api.${process.env.DOMAIN_NAME}`,
    ID_ORIGIN: `//id.${process.env.DOMAIN_NAME}`,
    INVESTOR_ORIGIN: `//investor.${process.env.DOMAIN_NAME}`,
    CMS_ORIGIN: `//${process.env.DOMAIN_NAME}`,
  }
)
