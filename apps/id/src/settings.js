window.SETTINGS = {
  FRONTEND_ROOT_DOMAIN_NAME: '{{ default .Env.FRONTEND_ROOT_DOMAIN_NAME "jibrel.com" }}',
  API_BASE_URL: '{{ default .Env.API_BASE_URL "//api.jibrel.com" }}',
}
