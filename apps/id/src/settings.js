window.SETTINGS = {
  FRONTEND_ROOT_DOMAIN_NAME: '{{ default .Env.FRONTEND_ROOT_DOMAIN_NAME "tokenize.jibrel.network" }}',
  API_BASE_URL: '{{ default .Env.API_BASE_URL "//api.tokenize.jibrel.network" }}',
  ID_ORIGIN: '{{ default .Env.ID_ORIGIN "//id.tokenize.jibrel.network" }}',
  INVESTOR_ORIGIN: '{{ default .Env.INVESTOR_ORIGIN "//investor.tokenize.jibrel.network" }}',
  CMS_ORIGIN: '{{ default .Env.CMS_ORIGIN "//tokenize.jibrel.network" }}',
}
