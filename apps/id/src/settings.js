window.SETTINGS = {
  DOMAIN: '{{ default .Env.ID_DOMAIN "//id.jibrel.com" }}',
  API_BASE_URL: '{{ default .Env.API_BASE_URL "//api.jibrel.com" }}',
}
