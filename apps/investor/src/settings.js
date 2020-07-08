window.SETTINGS = {
  FRONTEND_ROOT_DOMAIN_NAME: '{{ default .Env.FRONTEND_ROOT_DOMAIN_NAME "tokenize.jibrel.network" }}',
  API_BASE_URL: '{{ default .Env.API_BASE_URL "//api.tokenize.jibrel.network" }}',
  CMS_ORIGIN: '{{ default .Env.CMS_ORIGIN "" }}',
  API_REQUEST_MAX_ATTEMPTS: '{{ default .Env.API_REQUEST_MAX_ATTEMPTS "32" }}',
  FOLOOSI_MERCHANT_KEY: '{{ .Env.FOLOOSI_MERCHANT_KEY }}',
}
