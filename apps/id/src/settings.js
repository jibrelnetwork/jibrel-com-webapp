window.SETTINGS = {
  DOMAIN: '{{ default .Env.ID_DOMAIN "https://id.jibrel.com" }}',
  API_BASE_URL: '{{ default .Env.API_BASE_URL "https://api.jibrel.com" }}',
}
