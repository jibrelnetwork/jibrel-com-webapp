window.SETTINGS = {
  DOMAIN_NAME: '{{ default .Env.DOMAIN_NAME "tokenize.jibrel.network" }}',
  API_REQUEST_MAX_ATTEMPTS: '{{ default .Env.API_REQUEST_MAX_ATTEMPTS "32" }}',
  FOLOOSI_MERCHANT_KEY: '{{ .Env.FOLOOSI_MERCHANT_KEY }}',
}
