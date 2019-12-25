# Jibrel Web Application Frontend

Private applications and pages for Jibrel Startup Investments Platform.

## Deployment

Required server run environment variables:

- `ID_DOMAIN` = domain name for ID application. Must include protocol. Must not include trailing slash.
    - Example for production: `//id.jibrel.com`
- `API_BASE_URL` = base url to backend API. Must include protocol. Must not include trailing slash.
    - Example for production: `//api.jibrel.com`
- `CSP_CONNECT_SRC` = `connect-src` part for Content-Security-Policy header. See [connect-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) for details.
    - Example for production: `*.jibrel.com` 
- `CSP_IMG_SRC` = `img-src` part for Content-Security-Policy header. See [img-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src) for details.
    - Example for production: `jibrel.com` 
- `CSP_STYLE_SRC` = `style-src` part for Content-Security-Policy header. See [style-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src) for details.
    - Example for production: `jibrel.com` 
- `CSP_SCRIPT_SRC` = `script-src` part for Content-Security-Policy header. See [script-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) for details.
    - Example for production: `jibrel.com` 
- `CSP_MANIFEST_SRC` = `manifest-src` part for Content-Security-Policy header. See [manifest-src on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/manifest-src) for details.
    - Example for production: `jibrel.com` 
