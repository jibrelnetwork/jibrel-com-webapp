window.SETTINGS = {
  FRONTEND_ROOT_DOMAIN_NAME: '{{ default .Env.FRONTEND_ROOT_DOMAIN_NAME "api.tokenize.jibrel.network" }}',
  API_BASE_URL: '{{ default .Env.API_BASE_URL "//api.tokenize.jibrel.network" }}',
  ID_ORIGIN: '{{ default .Env.ID_ORIGIN "" }}',
  INVESTOR_ORIGIN: '{{ default .Env.INVESTOR_ORIGIN "" }}',
  CMS_ORIGIN: '{{ default .Env.CMS_ORIGIN "" }}',
}
